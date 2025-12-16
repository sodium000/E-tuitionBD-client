import { useForm } from "react-hook-form";
import { 
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaUniversity, FaCalendarAlt, FaMoneyBillWave, FaUserTag 
} from "react-icons/fa";

const updateProfile = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "raisultonmoy.dev@gmail.com",
      displayName: "Raisul Islam Tonmoy",
      photoURL: "https://i.ibb.co/Pp2T833/Ejp6.png",
      Phone: "01533920326",
      PreferredArea: "Faridpur",
      TuitionRegion: "Dhaka",
      selectDistrict: "Dhaka",
    }
  });

  const onSubmit = (data) => console.log("Form Data:", data);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-12"
      >
        {/* Sidebar/Profile Section */}
        <div className="md:col-span-4 bg-indigo-600 p-8 text-white flex flex-col items-center justify-center">
          <div className="relative mb-4">
            <img 
              src="https://i.ibb.co/Pp2T833/Ejp6.png" 
              alt="Profile" 
              className="w-32 h-32 rounded-full border-4 border-white/30 object-cover"
            />
          </div>
          <h2 className="text-xl font-bold">Raisul Islam Tonmoy</h2>
          <p className="text-indigo-100 text-sm">Tutor Registration</p>
        </div>

        {/* Form Fields Section */}
        <div className="md:col-span-8 p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Display Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaUser className="text-indigo-500" /> Full Name
              </label>
              <input {...register("displayName")} className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition" />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaEnvelope className="text-indigo-500" /> Email
              </label>
              <input {...register("email")} className="w-full p-2 border rounded-lg bg-gray-50 cursor-not-allowed" readOnly />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaPhone className="text-indigo-500" /> Phone Number
              </label>
              <input {...register("Phone")} className="w-full p-2 border rounded-lg" />
            </div>

            {/* Role Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaUserTag className="text-indigo-500" /> Role
              </label>
              <select {...register("role")} className="w-full p-2 border rounded-lg">
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
              </select>
            </div>

            {/* Location Fields */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt className="text-indigo-500" /> Tuition Region
              </label>
              <input {...register("TuitionRegion")} className="w-full p-2 border rounded-lg" />
            </div>

            {/* Minimum Salary */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaMoneyBillWave className="text-indigo-500" /> Min Salary (BDT)
              </label>
              <input type="number" {...register("minSalary")} placeholder="e.g. 5000" className="w-full p-2 border rounded-lg" />
            </div>

            {/* Days Per Week */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaCalendarAlt className="text-indigo-500" /> Days Per Week
              </label>
              <select {...register("daysPerWeek")} className="w-full p-2 border rounded-lg">
                {[1,2,3,4,5,6].map(d => <option key={d} value={d}>{d} Days</option>)}
              </select>
            </div>

            {/* Education Background */}
            <div className="md:col-span-2 space-y-1">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaUniversity className="text-indigo-500" /> Education Background
              </label>
              <textarea 
                {...register("education")} 
                placeholder="Describe your qualifications..." 
                className="w-full p-2 border rounded-lg h-24"
              ></textarea>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 shadow-lg shadow-indigo-200"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default updateProfile;