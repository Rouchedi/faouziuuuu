import React, { useState, useEffect, useRef } from 'react';
    import { ShoppingCart, Trash2, PlusCircle, Coins, LightbulbIcon, Star, Wallet, TrendingDown, Calendar, Tag, Edit, CheckCircle } from 'lucide-react';
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';
    import TypingGame from './TypingGame';
    import QuizGame from './QuizGame';
    import NumberGuessingGame from './NumberGuessingGame';
    import RockPaperScissors from './RockPaperScissors';
    import SlidingPuzzle from './SlidingPuzzle';
    import FifteenPuzzle from './FifteenPuzzle';
    import SavingChallenge from './SavingChallenge';
    import SavingGame from './SavingGame';
    import TicTacToe from './TicTacToe'; // Import TicTacToe
    import ConnectFour from './ConnectFour'; // Import ConnectFour
    import SimonSays from './SimonSays'; // Import SimonSays
    import WordSearch from './WordSearch'; // Import WordSearch
    import Sudoku from './Sudoku'; // Import Sudoku

    interface ListItem {
      id: number;
      name: string;
      completed: boolean;
    }

    interface AdditionalListItem {
      id: number;
      name: string;
      quantity: number;
      completed: boolean;
      points: number;
      price: number;
      plannedDate?: string;
    }

    interface DailyNote {
      date: string;
      note: string;
      tasks: { id: number; text: string; completed: boolean }[];
      appointments: { id: number; time: string; description: string }[];
    }

    function App() {
      const [items, setItems] = useState<ListItem[]>(() => {
        const storedItems = localStorage.getItem('mainListItems');
        return storedItems ? JSON.parse(storedItems) : [];
      });
      const [additionalItems, setAdditionalItems] = useState<AdditionalListItem[]>(() => {
        const storedAdditionalItems = localStorage.getItem('additionalListItems');
        return storedAdditionalItems ? JSON.parse(storedAdditionalItems) : [];
      });
      const [newItem, setNewItem] = useState('');
      const [quantity, setQuantity] = useState(1);
      const [price, setPrice] = useState(0);
      const [showTips, setShowTips] = useState(false);
      const [totalPoints, setTotalPoints] = useState<number>(() => {
        const storedPoints = localStorage.getItem('totalPoints');
        return storedPoints ? parseInt(storedPoints) : 0;
      });
      const [monthlyBudget, setMonthlyBudget] = useState<number>(() => {
        const storedBudget = localStorage.getItem('monthlyBudget');
        return storedBudget ? parseInt(storedBudget) : 0;
      });
      const [newBudget, setNewBudget] = useState(monthlyBudget.toString());
      const [additionalPlannedDate, setAdditionalPlannedDate] = useState('');
      const [selectedDate, setSelectedDate] = useState<Date>(new Date());
      const [note, setNote] = useState('');
      const [dailyNotes, setDailyNotes] = useState<DailyNote[]>(() => {
        const storedNotes = localStorage.getItem('dailyNotes');
        return storedNotes ? JSON.parse(storedNotes) : [];
      });
      const [newTask, setNewTask] = useState('');
      const [editingNote, setEditingNote] = useState(false);
      const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
      const [editingTaskText, setEditingTaskText] = useState('');
      const [budgetCycleComplete, setBudgetCycleComplete] = useState(false);
      const [newAppointmentTime, setNewAppointmentTime] = useState('');
      const [newAppointmentDescription, setNewAppointmentDescription] = useState('');
      const [donationMessage, setDonationMessage] = useState('');
      const [motivationalMessage, setMotivationalMessage] = useState('');
      const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
      const [totalAdditionalSpent, setTotalAdditionalSpent] = useState(0);

      useEffect(() => {
        localStorage.setItem('mainListItems', JSON.stringify(items));
      }, [items]);

      useEffect(() =>
        localStorage.setItem('additionalListItems', JSON.stringify(additionalItems))
      , [additionalItems]);

      useEffect(() => {
        localStorage.setItem('dailyNotes', JSON.stringify(dailyNotes));
      }, [dailyNotes]);

      useEffect(() => {
        localStorage.setItem('totalPoints', String(totalPoints));
      }, [totalPoints]);

      useEffect(() => {
        localStorage.setItem('monthlyBudget', String(monthlyBudget));
      }, [monthlyBudget]);

      useEffect(() => {
        const now = new Date();
        const currentMonth = now.getMonth();

        if (currentMonth !== Number(localStorage.getItem('lastMonth'))) {
          localStorage.setItem('lastMonth', String(currentMonth));
          setBudgetCycleComplete(false);
        }
      }, []);

      useEffect(() => {
        let totalSpent = additionalItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalAdditionalSpent(totalSpent);
      }, [additionalItems]);

      useEffect(() => {
        const messages = [
          "Votre soutien fait la différence !",
          "Un petit geste pour un grand projet.",
          "Aidez-nous à améliorer cette application.",
          "Votre don est précieux."
        ];
        const randomIndex = Math.floor(Math.random() * messages.length);
        setDonationMessage(messages[randomIndex]);
      }, []);

      useEffect(() => {
        const motivationalMessages = [
          "Chaque petit pas compte vers de grandes économies !",
          "Aujourd'hui, faites un choix qui allège votre budget.",
          "L'astuce du jour : planifiez vos repas pour éviter le gaspillage.",
          "Un esprit économe est un esprit libre."
        ];
        const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
        setMotivationalMessage(motivationalMessages[randomIndex]);
      }, [selectedDate]);

      const remainingBudget = monthlyBudget - totalAdditionalSpent;
      const budgetProgress = (totalAdditionalSpent / monthlyBudget) * 100;

      const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.trim()) {
          setItems([
            ...items,
            {
              id: Date.now(),
              name: newItem.trim(),
              completed: false,
            },
          ]);
          setNewItem('');
        }
      };

      const addAdditionalItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (newItem.trim() && price > 0) {
          const pointsForPurchase = Math.floor(price * quantity / 10);
          setTotalPoints(prev => prev + pointsForPurchase);

          setAdditionalItems([
            ...additionalItems,
            {
              id: Date.now(),
              name: newItem.trim(),
              quantity: quantity,
              completed: false,
              points: 5 * quantity,
              price: price,
              plannedDate: additionalPlannedDate
            },
          ]);
          setNewItem('');
          setQuantity(1);
          setPrice(0);
          setAdditionalPlannedDate('');
        }
      };

      const toggleItem = (id: number) => {
        setItems(
          items.map((item) => {
            if (item.id === id) {
              const newCompleted = !item.completed;
              return { ...item, completed: newCompleted };
            }
            return item;
          })
        );
      };

      const toggleAdditionalItem = (id: number) => {
        setAdditionalItems(
          additionalItems.map((item) => {
            if (item.id === id) {
              return { ...item, completed: !item.completed };
            }
            return item;
          })
        );
      };

      const removeItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
      };

      const removeAdditionalItem = (id: number) => {
        setAdditionalItems(additionalItems.filter((item) => item.id !== id));
      };

      const savingTips = [
        "Comparez les prix entre différents magasins",
        "Achetez les produits de saison",
          "Profitez des promotions et des réductions",
          "Faites une liste avant d'aller faire les courses",
          "Évitez d'aller faire les courses le ventre vide"
        ];

        const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewBudget(e.target.value);
        };

        const applyBudgetChange = () => {
            const newBudgetValue = parseFloat(newBudget);
            if (!isNaN(newBudgetValue)) {
                setMonthlyBudget(newBudgetValue);
                setNewBudget(newBudgetValue.toString());
            } else {
                alert("Veuillez entrer un montant valide.");
            }
        };

        useEffect(() => {
            if (monthlyBudget > 0 && totalAdditionalSpent >= monthlyBudget && !budgetCycleComplete) {
                const pointsEarned = Math.floor(monthlyBudget / 10);
                setTotalPoints(prev => prev + pointsEarned);
                alert(`Félicitations ! Vous avez gagné ${pointsEarned} points pour avoir respecté votre budget.`);
                setBudgetCycleComplete(true);
            }
        }, [totalAdditionalSpent, monthlyBudget, budgetCycleComplete]);

        const handleDateChange = (date: Date) => {
            setSelectedDate(date);
        };

        const formatDate = (date: Date): string => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const saveNote = () => {
            const formattedDate = formatDate(selectedDate);
            const existingNoteIndex = dailyNotes.findIndex(note => note.date === formattedDate);

            if (existingNoteIndex !== -1) {
                const updatedNotes = [...dailyNotes];
                updatedNotes[existingNoteIndex] = { ...updatedNotes[existingNoteIndex], note: note };
                setDailyNotes(updatedNotes);
            } else {
                setDailyNotes([...dailyNotes, { date: formattedDate, note: note, tasks: [], appointments: [] }]);
            }
            setEditingNote(false);
        };

        const getNoteForDate = (date: Date): string => {
            const formattedDate = formatDate(date);
            const noteForDate = dailyNotes.find(noteItem => noteItem.date === formattedDate);
            return noteForDate ? noteForDate.note : '';
        };

        useEffect(() => {
            setNote(getNoteForDate(selectedDate));
        }, [selectedDate, dailyNotes]);

        const handleTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewTask(e.target.value);
        };

        const addTask = () => {
            const formattedDate = formatDate(selectedDate);
            const existingNoteIndex = dailyNotes.findIndex(note => note.date === formattedDate);

            if (existingNoteIndex !== -1) {
                const updatedNotes = [...dailyNotes];
                const newTaskItem = { id: Date.now(), text: newTask, completed: false };
                updatedNotes[existingNoteIndex].tasks = [...updatedNotes[existingNoteIndex].tasks, newTaskItem];
                setDailyNotes(updatedNotes);
            } else {
                const newTaskItem = { id: Date.now(), text: newTask, completed: false };
                setDailyNotes([{ date: formattedDate, note: '', tasks: [newTaskItem], appointments: [] }]);
            }
            setNewTask('');
        };

        const toggleTask = (taskId: number) => {
            const formattedDate = formatDate(selectedDate);
            const existingNoteIndex = dailyNotes.findIndex(note => note.date === formattedDate);

            if (existingNoteIndex !== -1) {
                const updatedNotes = [...dailyNotes];
                updatedNotes[existingNoteIndex].tasks = updatedNotes[existingNoteIndex].tasks.map(task => {
                    if (task.id === taskId) {
                        return { ...task, completed: !task.completed };
                    }
                    return task;
                });
                setDailyNotes(updatedNotes);
            }
        };

        const removeTask = (taskId: number) => {
            const formattedDate = formatDate(selectedDate);
            const existingNoteIndex = dailyNotes.findIndex(note => note.date === formattedDate);

            if (existingNoteIndex !== -1) {
                const updatedNotes = [...dailyNotes];
                updatedNotes[existingNoteIndex].tasks = updatedNotes[existingNoteIndex].tasks.filter(task => task.id !== taskId);
                setDailyNotes(updatedNotes);
            }
        };

        const startEditingTask = (taskId: number, taskText: string) => {
            setEditingTaskId(taskId);
            setEditingTaskText(taskText);
        };

        const saveEditedTask = (taskId: number) => {
            const formattedDate = formatDate(selectedDate);
            const existingNoteIndex = dailyNotes.findIndex(note => note.date === formattedDate);

            if (existingNoteIndex !== -1) {
                const updatedNotes = [...dailyNotes];
                updatedNotes[existingNoteIndex].tasks = updatedNotes[existingNoteIndex].tasks.map(task => {
                    if (task.id === taskId) {
                        return { ...task, text: editingTaskText };
                    }
                    return task;
                });
                setDailyNotes(updatedNotes);
                setEditingTaskId(null);
                setEditingTaskText('');
            }
        };

        const getTasksForDate = (date: Date): { id: number; text: string; completed: boolean }[] => {
            const formattedDate = formatDate(date);
            const noteForDate = dailyNotes.find(noteItem => noteItem.date === formattedDate);
            return noteForDate ? noteForDate.tasks : [];
        };

        const addAppointment = () => {
            const formattedDate = formatDate(selectedDate);
            const existingNoteIndex = dailyNotes.findIndex(note => note.date === formattedDate);

            const newAppointment = {
                id: Date.now(),
                time: newAppointmentTime,
                description: newAppointmentDescription,
            };

            if (existingNoteIndex !== -1) {
                const updatedNotes = [...dailyNotes];
                updatedNotes[existingNoteIndex].appointments = [
                    ...(updatedNotes[existingNoteIndex].appointments || []),
                    newAppointment,
                ];
                setDailyNotes(updatedNotes);
            } else {
                setDailyNotes([
                    {
                        date: formattedDate,
                        note: '',
                        tasks: [],
                        appointments: [newAppointment],
                    },
                ]);
            }

            setNewAppointmentTime('');
            setNewAppointmentDescription('');
        };

        const getAppointmentsForDate = (date: Date): { id: number; time: string; description: string }[] => {
            const formattedDate = formatDate(date);
            const noteForDate = dailyNotes.find(noteItem => noteItem.date === formattedDate);
            return noteForDate ? (noteForDate.appointments || []) : [];
        };

        const clearHistory = () => {
            localStorage.clear();
            setItems([]);
            setAdditionalItems([]);
            setDailyNotes([]);
            setTotalPoints(0);
            setMonthlyBudget(0);
            setNewBudget("0");
            alert("L'historique a été effacé.");
        };
        const resetPointsAndBudget = () => {
            setTotalPoints(0);
            setMonthlyBudget(0);
            setNewBudget("0");
            localStorage.setItem('totalPoints', '0');
            localStorage.setItem('monthlyBudget', '0');
        };

      return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            <header className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <ShoppingCart className="w-12 h-12 text-blue-600" />
              </div>
              <h1 className="text-4xl font-bold text-blue-900 mb-2">Ma Liste de Courses</h1>
              <p className="text-blue-600">N'oubliez rien lors de vos achats</p>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" aria-hidden="true"/>
                  <span className="text-xl font-bold">{totalPoints} points</span>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Wallet className="w-6 h-6 text-green-500" aria-hidden="true"/>
                    <span className="text-xl font-bold">{remainingBudget.toFixed(2)}€</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={budgetProgress}>
                    <div 
                      className={`h-2.5 rounded-full ${budgetProgress > 90 ? 'bg-red-500' : budgetProgress > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                      style={{ width: `${Math.min(budgetProgress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Budget: {monthlyBudget}€</p>
                </div>

                <div className="bg-white p-4 rounded-lg shadow flex items-center justify-center gap-2">
                  <TrendingDown className="w-6 h-6 text-blue-500" aria-hidden="true"/>
                  <span className="text-xl font-bold">Économies: {(monthlyBudget - totalAdditionalSpent).toFixed(2)}€</span>
                </div>
              </div>
            </header>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <form onSubmit={addItem} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Ajouter un article..."
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Nom de l'article à ajouter"
                  />
                  </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-6 h-6" aria-hidden="true"/>
                  <span>Ajouter à la liste</span>
                </button>
              </form>

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-blue-600" aria-hidden="true"/>
                  Liste des courses
                </h2>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleItem(item.id)}
                          className="w-5 h-5 text-blue-600"
                          aria-label={`Marquer ${item.name} comme terminé`}
                        />
                        <div className={`flex-1 ${item.completed ? 'line-through text-gray-500' : ''}`}>
                          <div className="flex items-center gap-2">
                            <span>{item.name}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Supprimer ${item.name} de la liste`}
                      >
                        <Trash2 className="w-5 h-5" aria-hidden="true"/>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
              <form onSubmit={addAdditionalItem} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Ajouter un article supplémentaire..."
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Nom de l'article supplémentaire à ajouter"
                  />
                  <div className="flex gap-2">
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      placeholder="Quantité"
                      className="w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Quantité de l'article"
                    />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(parseFloat(e.target.value))}
                      placeholder="Prix €"
                      className="w-24 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Prix de l'article en euros"
                    />
                     <input
                      type="date"
                      value={additionalPlannedDate}
                      onChange={(e) => setAdditionalPlannedDate(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Date prévue pour l'achat"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-6 h-6" aria-hidden="true"/>
                  <span>Ajouter à la grille</span>
                </button>
              </form>

              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-green-600" aria-hidden="true"/>
                  Grille de calcul de budget
                </h2>
                <ul className="space-y-2">
                  {additionalItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-betweenp-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleAdditionalItem(item.id)}
                          className="w-5 h-5 text-green-600"
                          aria-label={`Marquer ${item.name} comme terminé`}
                        />
                        <div className={`flex-1 ${item.completed ? 'line-through text-gray-500' : ''}`}>
                          <div className="flex items-center gap-2">
                            <span>{item.name}</span>
                            <span className="text-sm text-gray-600">×{item.quantity}</span>
                            <span className="text-sm font-medium text-green-600">{(item.price * item.quantity).toFixed(2)}€</span>
                             {item.plannedDate && (
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Calendar className="w-4 h-4" aria-hidden="true"/>
                              {new Date(item.plannedDate).toLocaleDateString()}
                            </div>
                          )}
                          </div>
                        </div>
                        <span className="text-yellow-600 text-sm flex items-center gap-1">
                          <Star className="w-4 h-4" aria-hidden="true"/>
                          {item.points}
                        </span>
                      </div>
                      <button
                        onClick={() => removeAdditionalItem(item.id)}
                        className="text-red-500 hover:text-red-700"
                        aria-label={`Supprimer ${item.name} de la grille`}
                      >
                        <Trash2 className="w-5 h-5" aria-hidden="true"/>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-4 mb-2 md:mb-0">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-green-600" aria-hidden="true"/>
                  Somme dépensée: {totalAdditionalSpent.toFixed(2)}€
                </h2>
              </div>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  value={newBudget}
                  onChange={handleBudgetChange}
                  placeholder="Modifier le budget"
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-32"
                  aria-label="Modifier le budget mensuel"
                />
                <button
                  onClick={applyBudgetChange}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Appliquer
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Coins className="w-5 h-5 text-blue-600" aria-hidden="true"/>
                Récapitulatif des dépenses
              </h2>
              <p>Dépenses grille de calcul de budget: {totalAdditionalSpent.toFixed(2)}€</p>
              <p className="font-semibold">Total des dépenses: {totalAdditionalSpent.toFixed(2)}€</p>
            </div>
             <SavingChallenge />
             <SavingGame />
            <div className="bg-white rounded-lg shadow-lg p-6">
              <button
                onClick={() => setShowTips(!showTips)}
                className="flex items-center gap-2 text-blue-600 mb-4"
                aria-expanded={showTips}
                aria-controls="savingTipsList"
              >
                <LightbulbIcon className="w-6 h-6" aria-hidden="true"/>
              </button>
              
              {showTips && (
                <ul className="space-y-2 text-gray-700" id="savingTipsList">
                  {savingTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Coins className="w-5 h-5 text-yellow-500 mt-1 flex-shrink-0" aria-hidden="true"/>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" aria-hidden="true"/>
                Calendrier et Bloc-notes quotidien
              </h2>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-1/2">
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    dateFormat="yyyy-MM-dd"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Choisir une date"
                  />
                </div>
                <div className="md:w-1/2">
                  {editingNote ? (
                    <div className="flex flex-col">
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        placeholder="Ajouter une note pour cette journée..."
                        className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                        aria-label="Note pour la journée"
                      />
                      <button
                        onClick={saveNote}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors mt-2"
                      >
                        Enregistrer la note
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <div className="p-3 border border-gray-300 rounded-lg h-32 overflow-auto" aria-live="polite">
                        {note || 'Aucune note pour cette journée.'}
                      </div>
                      <button
                        onClick={() => setEditingNote(true)}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors mt-2"
                      >
                        <Edit className="w-4 h-4 inline-block mr-2" aria-hidden="true"/>
                        Modifier la note
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Tâches du jour</h3>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={newTask}
                    onChange={handleTaskChange}
                    placeholder="Ajouter une tâche..."
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                    aria-label="Ajouter une nouvelle tâche"
                  />
                  <button
                    onClick={addTask}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Ajouter
                  </button>
                </div>
                <ul className="space-y-2">
                  {getTasksForDate(selectedDate).map(task => (
                    <li key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => toggleTask(task.id)}
                          className="w-5 h-5 text-blue-600"
                          aria-label={`Marquer la tâche "${task.text}" comme terminée`}
                        />
                        {editingTaskId === task.id ? (
                          <div className="flex items-center flex-1">
                            <input
                              type="text"
                              value={editingTaskText}
                              onChange={(e) => setEditingTaskText(e.target.value)}
                              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                              aria-label="Modifier le texte de la tâche"
                            />
                            <button
                              onClick={() => saveEditedTask(task.id)}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors ml-2"
                            >
                              Sauvegarder                            </button>
                          </div>
                        ) : (
                          <div className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.text}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {editingTaskId!== task.id && (
                            <button
                              onClick={() => startEditingTask(task.id, task.text)}                        className="text-blue-500 hover:text-blue-700"
                              aria-label={`Modifier la tâche "${task.text}"`}
                            >
                              <Edit className="w-5 h-5" aria-hidden="true"/>
                            </button>
                          )}
                          <button
                            onClick={() => removeTask(task.id)}
                            className="text-red-500 hover:text-red-700"
                            aria-label={`Supprimer la tâche "${task.text}"`}
                          >
                            <Trash2 className="w-5 h-5" aria-hidden="true"/>
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Rendez-vous du jour</h3>
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="time"
                    value={newAppointmentTime}
                    onChange={(e) => setNewAppointmentTime(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Heure du rendez-vous"
                  />
                  <input
                    type="text"
                    value={newAppointmentDescription}
                    onChange={(e) => setNewAppointmentDescription(e.target.value)}
                    placeholder="Ajouter un rendez-vous..."
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
                    aria-label="Description du rendez-vous"
                  />
                  <button
                    onClick={addAppointment}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    aria-label="Ajouter un rendez-vous"
                  >
                    Ajouter
                  </button>
                </div>
                <ul className="space-y-2">
                  {getAppointmentsForDate(selectedDate).map(appointment => (
                    <li key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-semibold">{appointment.time}</span> - {appointment.description}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <SlidingPuzzle />
              <FifteenPuzzle />
              <QuizGame />
              <NumberGuessingGame />
              <RockPaperScissors />
              <TypingGame />
              <TicTacToe />
              <ConnectFour />
              <SimonSays />
              <WordSearch />
              <Sudoku />
            </div>
             <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
              <a href="https://www.paypal.com/donate?hosted_button_id=9ZYERE33QBLG3U" target="_blank" rel="noopener noreferrer" aria-label="Faire un don via PayPal (ouvre une nouvelle fenêtre)">
                <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                  Faire un don via PayPal
                </button>
              </a>
              <p className="text-gray-600">{donationMessage}</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between">
              <p className="text-gray-700">{motivationalMessage}</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <button
                onClick={clearHistory}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Effacer l'historique
              </button>
               <button
                onClick={resetPointsAndBudget}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Réinitialiser Points et Budget
              </button>
            </div>
          </div>
        </div>
      );
    }

    export default App;
