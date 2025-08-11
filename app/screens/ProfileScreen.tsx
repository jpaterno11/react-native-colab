import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Componentes reutilizables del Usuario B
import Avatar from '../../components/Avatar';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Badge from '../../components/Badge';
import ListItem from '../../components/ListItem';
import Input from '../../components/Input';
import ProfileCard from '../../components/ProfileCard';

// Hooks personalizados del Usuario B
import useLocalStorage from '../../hooks/useLocalStorage';

const { width } = Dimensions.get('window');

interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  bio: string;
  location: string;
  website: string;
}

interface UserStats {
  tasksCompleted: number;
  projectsCreated: number;
  daysActive: number;
  level: string;
}

const ProfileScreen: React.FC = () => {
  // Estado para la información del perfil
  const [profile, setProfile] = useState<UserProfile>({
    name: 'Joaquín Paterno',
    email: '48801722@est.ort.edu.ar',
    role: 'Desarrollador Frontend',
    bio: 'Apasionado por React Native y el desarrollo móvil. Me encanta crear experiencias de usuario intuitivas y funcionales.',
    location: 'Buenos Aires, Argentina',
    website: 'https://github.com/varcharJoaquin',
  });

  // Estado para las estadísticas del usuario
  const [stats, setStats] = useState<UserStats>({
    tasksCompleted: 42,
    projectsCreated: 8,
    daysActive: 156,
    level: 'Experto',
  });

  // Estado para las configuraciones
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoSync: true,
    privacyMode: false,
    locationSharing: true,
  });

  // Estado para el modo de edición
  const [isEditing, setIsEditing] = useState(false);
  const [editProfile, setEditProfile] = useState(profile);

  // Hook personalizado para almacenamiento local
  const { value: savedProfile, setValue: saveProfile } = useLocalStorage<UserProfile>('userProfile', {
    defaultValue: profile,
  });

  // Cargar perfil guardado al iniciar
  useEffect(() => {
    if (savedProfile) {
      setProfile(savedProfile);
      setEditProfile(savedProfile);
    }
  }, [savedProfile]);

  // Función para guardar cambios del perfil
  const handleSaveProfile = async () => {
    try {
      await saveProfile(editProfile);
      setProfile(editProfile);
      setIsEditing(false);
      Alert.alert('Éxito', 'Perfil actualizado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar el perfil');
    }
  };

  // Función para cancelar edición
  const handleCancelEdit = () => {
    setEditProfile(profile);
    setIsEditing(false);
  };

  // Función para manejar cambios en la configuración
  const handleSettingChange = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Función para exportar datos del perfil
  const handleExportProfile = () => {
    Alert.alert(
      'Exportar Perfil',
      '¿Deseas exportar tu información de perfil?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Exportar', onPress: () => {
          // Aquí se implementaría la lógica de exportación
          Alert.alert('Éxito', 'Perfil exportado correctamente');
        }},
      ]
    );
  };

  // Función para eliminar cuenta
  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar Cuenta',
      'Esta acción no se puede deshacer. ¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => {
          Alert.alert('Cuenta Eliminada', 'Tu cuenta ha sido eliminada');
        }},
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header del perfil */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Avatar
              source={profile.avatar}
              name={profile.name}
              size="xlarge"
              showBorder
              borderColor="#007AFF"
            />
            <Badge
              text={stats.level}
              variant="success"
              size="small"
              style={styles.levelBadge}
            />
          </View>
          
          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.role}>{profile.role}</Text>
          
          <View style={styles.actionButtons}>
            <Button
              title={isEditing ? "Guardar" : "Editar"}
              variant={isEditing ? "primary" : "outline"}
              size="medium"
              onPress={isEditing ? handleSaveProfile : () => setIsEditing(true)}
              style={styles.actionButton}
            />
            {isEditing && (
              <Button
                title="Cancelar"
                variant="secondary"
                size="medium"
                onPress={handleCancelEdit}
                style={styles.actionButton}
              />
            )}
          </View>
        </View>

        {/* Estadísticas del usuario */}
        <Card variant="elevated" padding="large" style={styles.statsCard}>
          <Text style={styles.sectionTitle}>Estadísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.tasksCompleted}</Text>
              <Text style={styles.statLabel}>Tareas Completadas</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.projectsCreated}</Text>
              <Text style={styles.statLabel}>Proyectos Creados</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{stats.daysActive}</Text>
              <Text style={styles.statLabel}>Días Activo</Text>
            </View>
          </View>
        </Card>

        {/* Información del perfil */}
        <Card variant="default" padding="large" style={styles.profileCard}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          
          {isEditing ? (
            <View>
              <Input
                label="Nombre"
                value={editProfile.name}
                onChangeText={(text) => setEditProfile(prev => ({ ...prev, name: text }))}
                placeholder="Tu nombre completo"
                containerStyle={styles.inputContainer}
              />
              <Input
                label="Email"
                value={editProfile.email}
                onChangeText={(text) => setEditProfile(prev => ({ ...prev, email: text }))}
                placeholder="tu@email.com"
                containerStyle={styles.inputContainer}
              />
              <Input
                label="Rol"
                value={editProfile.role}
                onChangeText={(text) => setEditProfile(prev => ({ ...prev, role: text }))}
                placeholder="Tu rol o título"
                containerStyle={styles.inputContainer}
              />
              <Input
                label="Biografía"
                value={editProfile.bio}
                onChangeText={(text) => setEditProfile(prev => ({ ...prev, bio: text }))}
                placeholder="Cuéntanos sobre ti"
                multiline
                numberOfLines={3}
                containerStyle={styles.inputContainer}
              />
              <Input
                label="Ubicación"
                value={editProfile.location}
                onChangeText={(text) => setEditProfile(prev => ({ ...prev, location: text }))}
                placeholder="Tu ubicación"
                containerStyle={styles.inputContainer}
              />
              <Input
                label="Sitio Web"
                value={editProfile.website}
                onChangeText={(text) => setEditProfile(prev => ({ ...prev, website: text }))}
                placeholder="https://tu-sitio.com"
                containerStyle={styles.inputContainer}
              />
            </View>
          ) : (
            <View>
              <ListItem
                title="Email"
                subtitle={profile.email}
                leftIcon={<Text style={styles.icon}>📧</Text>}
                showChevron={false}
              />
              <ListItem
                title="Biografía"
                subtitle={profile.bio}
                leftIcon={<Text style={styles.icon}>📝</Text>}
                showChevron={false}
              />
              <ListItem
                title="Ubicación"
                subtitle={profile.location}
                leftIcon={<Text style={styles.icon}>📍</Text>}
                showChevron={false}
              />
              <ListItem
                title="Sitio Web"
                subtitle={profile.website}
                leftIcon={<Text style={styles.icon}>🌐</Text>}
                showChevron={false}
              />
            </View>
          )}
        </Card>

        {/* Configuraciones */}
        <Card variant="default" padding="large" style={styles.settingsCard}>
          <Text style={styles.sectionTitle}>Configuraciones</Text>
          
          <ListItem
            title="Notificaciones"
            subtitle="Recibir notificaciones push"
            leftIcon={<Text style={styles.icon}>🔔</Text>}
            rightIcon={
              <Switch
                value={settings.notifications}
                onValueChange={(value) => handleSettingChange('notifications', value)}
                trackColor={{ false: '#E1E5E9', true: '#007AFF' }}
                thumbColor="#FFFFFF"
              />
            }
            showChevron={false}
          />
          
          <ListItem
            title="Modo Oscuro"
            subtitle="Cambiar tema de la aplicación"
            leftIcon={<Text style={styles.icon}>🌙</Text>}
            rightIcon={
              <Switch
                value={settings.darkMode}
                onValueChange={(value) => handleSettingChange('darkMode', value)}
                trackColor={{ false: '#E1E5E9', true: '#007AFF' }}
                thumbColor="#FFFFFF"
              />
            }
            showChevron={false}
          />
          
          <ListItem
            title="Sincronización Automática"
            subtitle="Sincronizar datos automáticamente"
            leftIcon={<Text style={styles.icon}>🔄</Text>}
            rightIcon={
              <Switch
                value={settings.autoSync}
                onValueChange={(value) => handleSettingChange('autoSync', value)}
                trackColor={{ false: '#E1E5E9', true: '#007AFF' }}
                thumbColor="#FFFFFF"
              />
            }
            showChevron={false}
          />
          
          <ListItem
            title="Modo Privacidad"
            subtitle="Ocultar información personal"
            leftIcon={<Text style={styles.icon}>🔒</Text>}
            rightIcon={
              <Switch
                value={settings.privacyMode}
                onValueChange={(value) => handleSettingChange('privacyMode', value)}
                trackColor={{ false: '#E1E5E9', true: '#007AFF' }}
                thumbColor="#FFFFFF"
              />
            }
            showChevron={false}
          />
          
          <ListItem
            title="Compartir Ubicación"
            subtitle="Permitir acceso a ubicación"
            leftIcon={<Text style={styles.icon}>📍</Text>}
            rightIcon={
              <Switch
                value={settings.locationSharing}
                onValueChange={(value) => handleSettingChange('locationSharing', value)}
                trackColor={{ false: '#E1E5E9', true: '#007AFF' }}
                thumbColor="#FFFFFF"
              />
            }
            showChevron={false}
          />
        </Card>

        {/* Acciones adicionales */}
        <Card variant="outlined" padding="large" style={styles.actionsCard}>
          <Text style={styles.sectionTitle}>Acciones</Text>
          
          <Button
            title="Exportar Perfil"
            variant="outline"
            size="medium"
            onPress={handleExportProfile}
            style={styles.actionButton}
          />
          
          <Button
            title="Eliminar Cuenta"
            variant="danger"
            size="medium"
            onPress={handleDeleteAccount}
            style={styles.actionButton}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E5E9',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  levelBadge: {
    position: 'absolute',
    bottom: -8,
    right: -8,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    minWidth: 100,
  },
  statsCard: {
    marginTop: 16,
  },
  profileCard: {
    marginTop: 16,
  },
  settingsCard: {
    marginTop: 16,
  },
  actionsCard: {
    marginTop: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  icon: {
    fontSize: 20,
  },
});

export default ProfileScreen;
