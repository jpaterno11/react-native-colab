import React, { useCallback, useEffect, useState } from 'react';
import {
    Alert,
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

export default function ExperimentalComponent() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [searchText, setSearchText] = useState('');
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(width));

  // Animación de entrada
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Filtrar todos basado en el filtro y búsqueda
  const filteredTodos = todos.filter(todo => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && !todo.completed) || 
      (filter === 'completed' && todo.completed);
    
    const matchesSearch = todo.text.toLowerCase().includes(searchText.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Agregar nuevo todo
  const addTodo = useCallback(() => {
    if (newTodoText.trim()) {
      const newTodo: TodoItem = {
        id: Date.now().toString(),
        text: newTodoText.trim(),
        completed: false,
        priority: selectedPriority,
        createdAt: new Date(),
      };
      
      setTodos(prev => [newTodo, ...prev]);
      setNewTodoText('');
      
      // Animación de entrada para el nuevo todo
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
    }
  }, [newTodoText, selectedPriority]);

  // Toggle completado
  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  // Eliminar todo
  const deleteTodo = useCallback((id: string) => {
    Alert.alert(
      'Eliminar Tarea',
      '¿Estás seguro de que quieres eliminar esta tarea?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => setTodos(prev => prev.filter(todo => todo.id !== id))
        },
      ]
    );
  }, []);

  // Obtener color de prioridad
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#dc3545';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  // Obtener texto de prioridad
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return 'Sin prioridad';
    }
  };

  // Estadísticas
  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.filter(todo => !todo.completed).length,
    highPriority: todos.filter(todo => todo.priority === 'high').length,
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, transform: [{ translateX: slideAnim }] }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Componente Experimental</Text>
          <Text style={styles.subtitle}>Nuevas funcionalidades con React Hooks</Text>
        </View>

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.completed}</Text>
            <Text style={styles.statLabel}>Completadas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.active}</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{stats.highPriority}</Text>
            <Text style={styles.statLabel}>Alta Prioridad</Text>
          </View>
        </View>

        {/* Formulario de nueva tarea */}
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Nueva Tarea</Text>
          
          <TextInput
            style={styles.input}
            placeholder="¿Qué necesitas hacer?"
            value={newTodoText}
            onChangeText={setNewTodoText}
            multiline
            numberOfLines={2}
          />

          {/* Selector de prioridad */}
          <View style={styles.priorityContainer}>
            <Text style={styles.priorityLabel}>Prioridad:</Text>
            <View style={styles.priorityButtons}>
              {(['low', 'medium', 'high'] as const).map(priority => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityButton,
                    selectedPriority === priority && styles.priorityButtonActive,
                    { borderColor: getPriorityColor(priority) }
                  ]}
                  onPress={() => setSelectedPriority(priority)}
                >
                  <Text style={[
                    styles.priorityButtonText,
                    selectedPriority === priority && styles.priorityButtonTextActive,
                    { color: selectedPriority === priority ? getPriorityColor(priority) : '#666' }
                  ]}>
                    {getPriorityText(priority)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.addButton, !newTodoText.trim() && styles.addButtonDisabled]} 
            onPress={addTodo}
            disabled={!newTodoText.trim()}
          >
            <Text style={styles.addButtonText}>Agregar Tarea</Text>
          </TouchableOpacity>
        </View>

        {/* Filtros y búsqueda */}
        <View style={styles.controlsContainer}>
          {/* Filtros */}
          <View style={styles.filterContainer}>
            <Text style={styles.controlsLabel}>Filtrar:</Text>
            <View style={styles.filterButtons}>
              {(['all', 'active', 'completed'] as const).map(filterOption => (
                <TouchableOpacity
                  key={filterOption}
                  style={[
                    styles.filterButton,
                    filter === filterOption && styles.filterButtonActive
                  ]}
                  onPress={() => setFilter(filterOption)}
                >
                  <Text style={[
                    styles.filterButtonText,
                    filter === filterOption && styles.filterButtonTextActive
                  ]}>
                    {filterOption === 'all' ? 'Todas' : 
                     filterOption === 'active' ? 'Pendientes' : 'Completadas'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Búsqueda */}
          <View style={styles.searchContainer}>
            <Text style={styles.controlsLabel}>Buscar:</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar tareas..."
              value={searchText}
              onChangeText={setSearchText}
            />
          </View>
        </View>

        {/* Lista de tareas */}
        <View style={styles.todosContainer}>
          <Text style={styles.todosTitle}>
            Tareas ({filteredTodos.length})
          </Text>
          
          {filteredTodos.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {searchText ? 'No se encontraron tareas' : 'No hay tareas para mostrar'}
              </Text>
            </View>
          ) : (
            filteredTodos.map(todo => (
              <View key={todo.id} style={styles.todoItem}>
                <View style={styles.todoHeader}>
                  <TouchableOpacity
                    style={styles.todoCheckbox}
                    onPress={() => toggleTodo(todo.id)}
                  >
                    <Text style={styles.todoCheckboxText}>
                      {todo.completed ? '✓' : '○'}
                    </Text>
                  </TouchableOpacity>
                  
                  <View style={styles.todoContent}>
                    <Text style={[
                      styles.todoText,
                      todo.completed && styles.todoTextCompleted
                    ]}>
                      {todo.text}
                    </Text>
                    <Text style={styles.todoDate}>
                      {todo.createdAt.toLocaleDateString()}
                    </Text>
                  </View>
                  
                  <View style={styles.todoActions}>
                    <View style={[
                      styles.priorityBadge,
                      { backgroundColor: getPriorityColor(todo.priority) }
                    ]}>
                      <Text style={styles.priorityBadgeText}>
                        {getPriorityText(todo.priority)}
                      </Text>
                    </View>
                    
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteTodo(todo.id)}
                    >
                      <Text style={styles.deleteButtonText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 15,
    minHeight: 60,
    textAlignVertical: 'top',
  },
  priorityContainer: {
    marginBottom: 15,
  },
  priorityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  priorityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priorityButton: {
    flex: 1,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  priorityButtonActive: {
    backgroundColor: '#f8f9fa',
  },
  priorityButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priorityButtonTextActive: {
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  controlsContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  controlsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
  },
  filterButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  searchContainer: {
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  todosContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 40,
  },
  todosTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  todoItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  todoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  todoCheckbox: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  todoCheckboxText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: 'bold',
  },
  todoContent: {
    flex: 1,
  },
  todoText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  todoTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  todoDate: {
    fontSize: 12,
    color: '#666',
  },
  todoActions: {
    alignItems: 'flex-end',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  priorityBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 18,
  },
});
