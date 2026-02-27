import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Trash2,
  Edit3,
  Car,
  DollarSign,
  Palette,
  Sun,
  Moon,
  Save,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1111/api/car";

const App = () => {
  const [cars, setCars] = useState([]);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    model: "",
    price: "",
    color: "#3b82f6",
  });

  useEffect(() => {
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setCars(res.data);
    } catch (err) {
      console.error("Xatolik:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { id, name, model, price, color } = formData;
    if (!name || !model || !price)
      return alert("Barcha maydonlarni to'ldiring!");

    try {
      const payload = { name, model, price: Number(price), color };
      id
        ? await axios.put(`${API_URL}/${id}`, payload)
        : await axios.post(API_URL, payload);
      resetForm();
      fetchCars();
    } catch (err) {
      alert("Backend bilan bog'lanishda xatolik!");
    }
  };

  const deleteCar = async (id) => {
    if (window.confirm("O'chirilsinmi?")) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        fetchCars();
      } catch (err) {
        alert("O'chirishda xatolik!");
      }
    }
  };

  const editCar = (car) => {
    setFormData({ ...car, color: car.color || "#3b82f6" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () =>
    setFormData({ id: null, name: "", model: "", price: "", color: "#3b82f6" });

  return (
    <div
      className={`min-h-screen transition-colors duration-700 p-4 sm:p-6 md:p-12 font-sans ${
        darkMode ? "bg-[#020617] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Background Decor */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[60%] md:w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${darkMode ? "bg-blue-600" : "bg-blue-300"}`}
        ></div>
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] rounded-full blur-[120px] opacity-20 ${darkMode ? "bg-purple-600" : "bg-purple-300"}`}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="flex flex-row justify-between items-center mb-10 gap-4">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-3 sm:gap-4"
          >
            <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm:rounded-2xl shadow-lg">
              <Car size={24} className="text-white sm:w-[30px] sm:h-[30px]" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-black tracking-tighter uppercase italic leading-none">
                AVTO <span className="text-blue-500 not-italic">PREMIUM</span>
              </h1>
              <p className="text-[8px] sm:text-[10px] font-bold text-slate-500 tracking-[0.2em] mt-1">
                LUXURY CRUD v3.0
              </p>
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700"
          >
            {darkMode ? (
              <Sun className="text-yellow-400 w-5 h-5" />
            ) : (
              <Moon className="text-indigo-600 w-5 h-5" />
            )}
          </motion.button>
        </header>

        {/* Input Form Section */}
        <motion.section
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-12"
        >
          <div className="bg-white/70 dark:bg-slate-900/40 backdrop-blur-2xl rounded-[24px] sm:rounded-[35px] p-6 sm:p-8 shadow-2xl border border-white dark:border-slate-800">
            <h2 className="text-lg sm:text-xl font-black mb-6 sm:mb-8 flex items-center gap-3">
              {formData.id ? (
                <Sparkles className="text-amber-500" />
              ) : (
                <Plus className="text-blue-500" />
              )}
              {formData.id ? "TAHRIRLASH" : "YANGI AVTO QO'SHISH"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
            >
              <input
                type="text"
                placeholder="Brend (BMW)"
                className="w-full bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:py-4 outline-none transition-all"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Model"
                className="w-full bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 rounded-xl sm:rounded-2xl px-5 py-3.5 sm:py-4 outline-none transition-all"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
              />
              <div className="relative">
                <DollarSign
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
                  size={18}
                />
                <input
                  type="number"
                  placeholder="Narxi"
                  className="w-full pl-11 pr-4 py-3.5 sm:py-4 bg-slate-100 dark:bg-slate-800/50 border-2 border-transparent focus:border-blue-500 rounded-xl sm:rounded-2xl outline-none transition-all"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="relative flex items-center justify-between px-5 py-3.5 sm:py-4 bg-slate-100 dark:bg-slate-800/50 rounded-xl sm:rounded-2xl border-2 border-transparent hover:border-blue-500 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full shadow-md border border-white/20"
                    style={{ backgroundColor: formData.color }}
                  ></div>
                  <span className="text-xs font-mono font-bold opacity-60 uppercase">
                    {formData.color}
                  </span>
                </div>
                <Palette size={18} className="text-blue-500" />
                <input
                  type="color"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />
              </div>

              <div className="sm:col-span-2 flex gap-3 sm:gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-4 sm:py-5 rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
                >
                  <Save size={18} /> {formData.id ? "SAQLASH" : "QO'SHISH"}
                </motion.button>
                {formData.id && (
                  <button
                    onClick={resetForm}
                    className="px-5 sm:px-6 rounded-xl sm:rounded-2xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </form>
          </div>
        </motion.section>

        {/* List Section */}
        <section>
          <div className="flex items-center gap-4 mb-6 px-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40 whitespace-nowrap">
              RO'YXAT
            </h3>
            <div className="h-[1px] w-full bg-slate-200 dark:bg-slate-800"></div>
            <span className="bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full text-[10px] font-bold">
              {cars.length}
            </span>
          </div>

          <AnimatePresence mode="popLayout">
            {loading ? (
              <div className="flex justify-center p-10">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
                {cars.map((car, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    key={car.id}
                    className="group bg-white/50 dark:bg-slate-900/30 backdrop-blur-md border border-white dark:border-slate-800 p-4 sm:p-6 rounded-[24px] sm:rounded-[30px] hover:shadow-xl transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6"
                  >
                    <div
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center text-white shadow-xl shrink-0"
                      style={{ backgroundColor: car.color }}
                    >
                      <Car size={24} className="sm:w-[28px] sm:h-[28px]" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-black truncate">
                        {car.name}
                      </h3>
                      <p className="text-slate-500 font-bold flex items-center gap-1 text-xs sm:text-sm">
                        {car.model}{" "}
                        <ChevronRight size={14} className="opacity-50" />
                      </p>
                    </div>

                    <div className="flex sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 dark:border-slate-800">
                      <div className="text-left sm:text-right">
                        <p className="text-xl sm:text-2xl font-black text-blue-500 leading-none">
                          ${Number(car.price).toLocaleString()}
                        </p>
                        <span className="text-[8px] font-black uppercase opacity-40">
                          Market Value
                        </span>
                      </div>

                      <div className="flex gap-2 sm:mt-3">
                        <button
                          onClick={() => editCar(car)}
                          className="p-2 sm:p-2.5 bg-amber-500/10 text-amber-500 rounded-lg sm:rounded-xl hover:bg-amber-500 hover:text-white transition-all"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => deleteCar(car.id)}
                          className="p-2 sm:p-2.5 bg-rose-500/10 text-rose-500 rounded-lg sm:rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
};

export default App;
