import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Filter, Plus, X, Check } from 'lucide-react-native';
import { CommunityListItem } from '@/components/CommunityListItem';
import { SearchBar } from '@/components/SearchBar';
import { CategoryFilter } from '@/components/CategoryFilter';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchCommunities, toggleJoinCommunity } from '@/store/community/actions';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'social', name: 'Social' },
  { id: 'sports', name: 'Sports' },
  { id: 'education', name: 'Education' },
  { id: 'arts', name: 'Arts' },
  { id: 'technology', name: 'Technology' },
  { id: 'outdoors', name: 'Outdoors' },
];

const memberOptions = [
  { id: 'all', name: 'All Communities' },
  { id: 'joined', name: 'Joined' },
  { id: 'notJoined', name: 'Not Joined' },
];

export default function CommunitiesScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { communities, status } = useAppSelector(state => state.community);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [membershipFilter, setMembershipFilter] = useState('all');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [tempCategory, setTempCategory] = useState('all');
  const [tempMembershipFilter, setTempMembershipFilter] = useState('all');
  
  const [filteredCommunities, setFilteredCommunities] = useState<typeof communities>([]);
  
  // Fetch communities on component mount
  useEffect(() => {
    dispatch(fetchCommunities());
  }, [dispatch]);
  
  // Apply filters when search query or filters change
  useEffect(() => {
    if (communities.length > 0) {
      const filtered = communities.filter(community => {
        // Search filter
        const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            community.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Category filter
        const matchesCategory = selectedCategory === 'all' || community.category === selectedCategory;
        
        // Membership filter
        const matchesMembership = membershipFilter === 'all' || 
                                (membershipFilter === 'joined' && community.joined) ||
                                (membershipFilter === 'notJoined' && !community.joined);
        
        return matchesSearch && matchesCategory && matchesMembership;
      });
      
      setFilteredCommunities(filtered);
    }
  }, [searchQuery, selectedCategory, membershipFilter, communities]);

  const handleJoinCommunity = (communityId: string) => {
    dispatch(toggleJoinCommunity(communityId));
  };

  const applyFilters = () => {
    setSelectedCategory(tempCategory);
    setMembershipFilter(tempMembershipFilter);
    setShowFilterModal(false);
  };

  const resetFilters = () => {
    setTempCategory('all');
    setTempMembershipFilter('all');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Communities</Text>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={() => router.push('/create-community')}
        >
          <Plus size={20} color="#FFFFFF" />
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <SearchBar 
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search communities..."
        />
        <TouchableOpacity 
          style={[
            styles.filterButton,
            (selectedCategory !== 'all' || membershipFilter !== 'all') && styles.activeFilterButton
          ]}
          onPress={() => {
            setTempCategory(selectedCategory);
            setTempMembershipFilter(membershipFilter);
            setShowFilterModal(true);
          }}
        >
          <Filter size={20} color={selectedCategory !== 'all' || membershipFilter !== 'all' ? "#FFFFFF" : "#001B3A"} />
        </TouchableOpacity>
      </View>
      
      <CategoryFilter 
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        disableScroll={true}
      />
      
      <FlatList
        data={filteredCommunities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CommunityListItem 
            community={item} 
            onPress={() => router.push(`/community/${item.id}`)}
            onJoin={() => handleJoinCommunity(item.id)}
          />
        )}
        contentContainerStyle={styles.communitiesList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {status.loading ? 'Loading communities...' : 'No communities found'}
            </Text>
          </View>
        }
      />

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Communities</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                <X size={24} color="#1E293B" />
              </TouchableOpacity>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Category</Text>
              <View style={styles.filterOptions}>
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.filterOption,
                      tempCategory === category.id && styles.selectedFilterOption
                    ]}
                    onPress={() => setTempCategory(category.id)}
                  >
                    <Text 
                      style={[
                        styles.filterOptionText,
                        tempCategory === category.id && styles.selectedFilterOptionText
                      ]}
                    >
                      {category.name}
                    </Text>
                    {tempCategory === category.id && (
                      <Check size={16} color="#FFFFFF" style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.filterSectionTitle}>Membership</Text>
              <View style={styles.filterOptions}>
                {memberOptions.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.filterOption,
                      tempMembershipFilter === option.id && styles.selectedFilterOption
                    ]}
                    onPress={() => setTempMembershipFilter(option.id)}
                  >
                    <Text 
                      style={[
                        styles.filterOptionText,
                        tempMembershipFilter === option.id && styles.selectedFilterOptionText
                      ]}
                    >
                      {option.name}
                    </Text>
                    {tempMembershipFilter === option.id && (
                      <Check size={16} color="#FFFFFF" style={styles.checkIcon} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.resetButton}
                onPress={resetFilters}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.applyButton}
                onPress={applyFilters}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001B3A',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#D1D5DB',
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#001B3A',
  },
  communitiesList: {
    padding: 16,
    gap: 12,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748B',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1E293B',
  },
  filterSection: {
    marginBottom: 24,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 12,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
  },
  selectedFilterOption: {
    backgroundColor: '#001B3A',
  },
  filterOptionText: {
    fontSize: 14,
    color: '#1E293B',
  },
  selectedFilterOptionText: {
    color: '#FFFFFF',
  },
  checkIcon: {
    marginLeft: 4,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  applyButton: {
    flex: 2,
    backgroundColor: '#001B3A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});