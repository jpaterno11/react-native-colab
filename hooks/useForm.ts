import { useState, useCallback, useRef } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | undefined;
}

interface ValidationRules {
  [key: string]: ValidationRule;
}

interface FormErrors {
  [key: string]: string;
}

interface UseFormOptions<T> {
  initialValues: T;
  validationRules?: ValidationRules;
  onSubmit?: (values: T) => void | Promise<void>;
}

const useForm = <T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);

  // Función para validar un campo específico
  const validateField = useCallback(
    (name: string, value: any): string | undefined => {
      const rules = validationRules[name];
      if (!rules) return undefined;

      // Validación requerida
      if (rules.required && (!value || value.toString().trim() === '')) {
        return 'Este campo es requerido';
      }

      // Validación de longitud mínima
      if (rules.minLength && value && value.toString().length < rules.minLength) {
        return `Mínimo ${rules.minLength} caracteres`;
      }

      // Validación de longitud máxima
      if (rules.maxLength && value && value.toString().length > rules.maxLength) {
        return `Máximo ${rules.maxLength} caracteres`;
      }

      // Validación de patrón
      if (rules.pattern && value && !rules.pattern.test(value.toString())) {
        return 'Formato inválido';
      }

      // Validación personalizada
      if (rules.custom) {
        return rules.custom(value);
      }

      return undefined;
    },
    [validationRules]
  );

  // Función para validar todos los campos
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validationRules, values, validateField]);

  // Función para establecer el valor de un campo
  const setFieldValue = useCallback(
    (name: string, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }));
      
      // Limpiar error del campo si existe
      if (errors[name]) {
        setErrors((prev) => ({ ...prev, [name]: '' }));
      }
    },
    [errors]
  );

  // Función para manejar cambios en inputs
  const handleChange = useCallback(
    (name: string, value: any) => {
      setFieldValue(name, value);
    },
    [setFieldValue]
  );

  // Función para manejar el blur de un campo
  const handleBlur = useCallback(
    (name: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }));
      
      // Validar el campo cuando pierde el foco
      const error = validateField(name, values[name]);
      if (error) {
        setErrors((prev) => ({ ...prev, [name]: error }));
      }
    },
    [validateField, values]
  );

  // Función para resetear el formulario
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Función para establecer errores manualmente
  const setFieldError = useCallback((name: string, error: string) => {
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, []);

  // Función para limpiar errores
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  // Función para manejar el envío del formulario
  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault();
      }

      if (!validateForm()) {
        return;
      }

      if (onSubmit) {
        try {
          setIsSubmitting(true);
          await onSubmit(values);
        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
          setIsSubmitting(false);
        }
      }
    },
    [validateForm, onSubmit, values]
  );

  // Función para obtener el estado de un campo
  const getFieldState = useCallback(
    (name: string) => {
      return {
        value: values[name],
        error: errors[name],
        touched: touched[name],
        isValid: !errors[name],
        hasError: !!errors[name],
      };
    },
    [values, errors, touched]
  );

  // Función para establecer múltiples valores
  const setValuesBulk = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  }, []);

  // Función para validar un campo específico sin cambiar el estado
  const validateFieldOnly = useCallback(
    (name: string): string | undefined => {
      return validateField(name, values[name]);
    },
    [validateField, values]
  );

  return {
    // Estado
    values,
    errors,
    touched,
    isSubmitting,
    
    // Funciones
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    setValuesBulk,
    resetForm,
    clearErrors,
    validateForm,
    validateField: validateFieldOnly,
    getFieldState,
    
    // Referencias
    formRef,
  };
};

export default useForm;
