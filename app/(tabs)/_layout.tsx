import { Tabs } from 'expo-router';
import { Platform } from 'react-native';
import { Chrome as Home, Calendar, Bell, Users, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#001B3A',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: {
          paddingTop: 5,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          height: Platform.OS === 'ios' ? 90 : 70,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
        },
        tabBarLabelStyle: {
          fontSize: 10, // Reduced from 12 to 10
          fontWeight: '500',
          marginBottom: 5,
        },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ color, size }) => <Calendar size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          title: 'Communities',
          tabBarIcon: ({ color, size }) => <Users size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, size }) => <Bell size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}