import React from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button, Card, Input } from '../../components';
import useForm from '../../hooks/useForm';
import { colors, layout, spacing, typography } from '../styles';

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactScreen: React.FC = () => {
  const { values, errors, handleChange, handleBlur, handleSubmit, isSubmitting, resetForm } = useForm<ContactForm>({
    initialValues: { name: '', email: '', subject: '', message: '' },
    validationRules: {
      name: { required: true, minLength: 3 },
      email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
      subject: { required: true, minLength: 3 },
      message: { required: true, minLength: 10, maxLength: 1000 },
    },
    onSubmit: async () => {
      await new Promise((res) => setTimeout(res, 800));
      Alert.alert('Mensaje Enviado', 'Gracias por contactarnos. Te responderemos pronto.', [
        { text: 'OK', onPress: () => resetForm() },
      ]);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Contacto</Text>
            <Text style={styles.subtitle}>¿Tienes alguna pregunta o sugerencia? ¡Nos encantaría escucharte!</Text>
          </View>

          <Card variant="default" padding="large" style={styles.infoCard}>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📧</Text>
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Email</Text>
                <Text style={styles.contactValue}>support@reactnativecolab.com</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📱</Text>
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Teléfono</Text>
                <Text style={styles.contactValue}>+54 11 1234-5678</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <Text style={styles.contactIcon}>📍</Text>
              <View style={styles.contactText}>
                <Text style={styles.contactLabel}>Ubicación</Text>
                <Text style={styles.contactValue}>Buenos Aires, Argentina</Text>
              </View>
            </View>
          </Card>

          <Card variant="elevated" padding="large" style={styles.formCard}>
            <Text style={styles.formTitle}>Envíanos un mensaje</Text>

            <Input
              label="Nombre"
              placeholder="Tu nombre completo"
              value={values.name}
              onChangeText={(val) => handleChange('name', val)}
              onBlur={() => handleBlur('name')}
              error={errors.name}
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Email"
              placeholder="tu@email.com"
              value={values.email}
              onChangeText={(val) => handleChange('email', val)}
              onBlur={() => handleBlur('email')}
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Asunto"
              placeholder="¿En qué podemos ayudarte?"
              value={values.subject}
              onChangeText={(val) => handleChange('subject', val)}
              onBlur={() => handleBlur('subject')}
              error={errors.subject}
              containerStyle={styles.inputContainer}
            />

            <Input
              label="Mensaje"
              placeholder="Describe tu consulta o sugerencia..."
              value={values.message}
              onChangeText={(val) => handleChange('message', val)}
              onBlur={() => handleBlur('message')}
              multiline
              numberOfLines={4}
              error={errors.message}
              containerStyle={styles.inputContainer}
            />

            <Button
              title={isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              onPress={handleSubmit}
              loading={isSubmitting}
              variant="primary"
              size="medium"
              style={styles.submitButton}
            />
          </Card>

          <Card variant="default" padding="large" style={styles.hoursCard}>
            <Text style={styles.hoursTitle}>Horarios de Atención</Text>
            <Text style={styles.hoursText}>Lunes a Viernes: 9:00 AM - 6:00 PM</Text>
            <Text style={styles.hoursText}>Sábados: 9:00 AM - 1:00 PM</Text>
            <Text style={styles.hoursText}>Domingos: Cerrado</Text>
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    padding: layout.screenPadding,
    backgroundColor: colors.surface,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.title,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.subtitle,
    textAlign: 'center',
    lineHeight: 22,
  },
  infoCard: {
    marginTop: spacing.lg,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  contactIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  contactText: {
    flex: 1,
  },
  contactLabel: {
    ...typography.caption,
    marginBottom: 2,
  },
  contactValue: {
    ...typography.body,
    fontWeight: '500',
  },
  formCard: {
    marginTop: spacing.lg,
  },
  formTitle: {
    ...typography.sectionTitle,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  submitButton: {
    marginTop: spacing.md,
  },
  hoursCard: {
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
  hoursTitle: {
    ...typography.sectionTitle,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  hoursText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
});

export default ContactScreen;
