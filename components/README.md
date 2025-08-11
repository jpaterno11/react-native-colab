# Componentes Reutilizables - Usuario B

Esta carpeta contiene todos los componentes reutilizables desarrollados por el **Usuario B** (varcharJoaquin) para el proyecto React Native Colab.

## Componentes Disponibles

### 🎨 Componentes de UI Básicos

#### Button
Componente de botón altamente personalizable con múltiples variantes y estados.

```tsx
import { Button } from '../components';

<Button
  title="Presionar"
  variant="primary"
  size="medium"
  onPress={() => console.log('Botón presionado')}
/>
```

**Props:**
- `title`: Texto del botón
- `variant`: 'primary' | 'secondary' | 'outline' | 'danger'
- `size`: 'small' | 'medium' | 'large'
- `disabled`: Estado deshabilitado
- `loading`: Estado de carga
- `onPress`: Función de callback

#### Card
Componente de tarjeta con diferentes estilos y opciones de padding.

```tsx
import { Card } from '../components';

<Card variant="elevated" padding="large">
  <Text>Contenido de la tarjeta</Text>
</Card>
```

**Props:**
- `variant`: 'default' | 'elevated' | 'outlined'
- `padding`: 'small' | 'medium' | 'large'
- `onPress`: Opcional, convierte la tarjeta en presionable

#### Input
Campo de entrada con validación y estados visuales.

```tsx
import { Input } from '../components';

<Input
  label="Email"
  placeholder="tu@email.com"
  error="Email inválido"
  helperText="Ingresa tu email válido"
/>
```

**Props:**
- `label`: Etiqueta del campo
- `error`: Mensaje de error
- `helperText`: Texto de ayuda
- `leftIcon` / `rightIcon`: Iconos opcionales

#### Badge
Etiqueta para mostrar estados o categorías.

```tsx
import { Badge } from '../components';

<Badge text="Nuevo" variant="success" size="medium" />
```

**Props:**
- `text`: Texto del badge
- `variant`: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'
- `size`: 'small' | 'medium' | 'large'

### 👤 Componentes de Usuario

#### Avatar
Componente para mostrar imágenes de perfil o iniciales.

```tsx
import { Avatar } from '../components';

<Avatar
  source="https://example.com/avatar.jpg"
  name="Juan Pérez"
  size="large"
  showBorder
/>
```

**Props:**
- `source`: URL de la imagen
- `name`: Nombre para generar iniciales
- `size`: 'small' | 'medium' | 'large' | 'xlarge'
- `showBorder`: Mostrar borde

#### ProfileCard
Tarjeta de perfil de usuario con información básica.

```tsx
import { ProfileCard } from '../components';

<ProfileCard
  name="Juan Pérez"
  email="juan@email.com"
  role="Desarrollador"
  stats={{ tasks: 42, projects: 8 }}
/>
```

#### ListItem
Elemento de lista con iconos y acciones.

```tsx
import { ListItem } from '../components';

<ListItem
  title="Configuración"
  subtitle="Ajustes de la aplicación"
  leftIcon={<Icon name="settings" />}
  rightIcon={<Switch />}
  showChevron
/>
```

### 🔧 Componentes Funcionales

#### Counter
Contador personalizable con controles.

```tsx
import { Counter } from '../components';

<Counter
  initialValue={0}
  minValue={0}
  maxValue={100}
  step={1}
  onValueChange={(value) => console.log(value)}
/>
```

#### Greeting
Saludo dinámico basado en la hora del día.

```tsx
import { Greeting } from '../components';

<Greeting name="Juan" timeOfDay="morning" />
```

#### NotificationBadge
Badge de notificaciones con animaciones.

```tsx
import { NotificationBadge } from '../components';

<NotificationBadge
  count={5}
  maxCount={99}
  onPress={() => console.log('Notificación presionada')}
/>
```

## Hooks Personalizados

### useLocalStorage
Hook para manejar almacenamiento local con AsyncStorage.

```tsx
import { useLocalStorage } from '../hooks';

const { value, setValue, removeValue } = useLocalStorage('userProfile', {
  defaultValue: { name: 'Juan' }
});
```

### useForm
Hook para manejar formularios con validación.

```tsx
import { useForm } from '../hooks';

const { values, errors, handleChange, handleSubmit } = useForm({
  initialValues: { email: '', password: '' },
  validationRules: {
    email: { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { required: true, minLength: 6 }
  },
  onSubmit: (values) => console.log(values)
});
```

### useNotifications
Hook para manejar notificaciones de la aplicación.

```tsx
import { useNotifications } from '../hooks';

const { notifications, addNotification, markAsRead } = useNotifications();
```

## Uso de los Componentes

### Importación Individual
```tsx
import Button from '../components/Button';
import Card from '../components/Card';
```

### Importación Agrupada
```tsx
import { Button, Card, Input } from '../components';
```

## Estilos y Temas

Todos los componentes siguen un sistema de diseño consistente:

- **Colores**: Paleta de colores iOS nativa
- **Tipografía**: Sistema de fuentes escalable
- **Espaciado**: Sistema de espaciado consistente
- **Sombras**: Elevaciones sutiles para profundidad
- **Bordes**: Bordes redondeados consistentes

## Contribuciones

Estos componentes fueron desarrollados por **varcharJoaquin** (Usuario B) como parte del proyecto colaborativo. Para contribuir:

1. Mantén la consistencia del diseño
2. Agrega documentación para nuevas props
3. Incluye ejemplos de uso
4. Sigue las convenciones de TypeScript
5. Agrega tests cuando sea posible

## Dependencias

- React Native
- React Native Safe Area Context
- AsyncStorage (para useLocalStorage)

## Licencia

Parte del proyecto React Native Colab - Desarrollado por varcharJoaquin
