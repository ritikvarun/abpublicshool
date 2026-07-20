import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import uploadIcon from '../assets/upload_image.jpg'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { FiTrash2, FiPlus, FiX } from 'react-icons/fi'

function Teachers() {
    const [teachers, setTeachers] = useState([])
    const { serverUrl } = useContext(authDataContext)
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)

    // Form states
    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState("")
    const [role, setRole] = useState("")
    const [exp, setExp] = useState("")
    const [instagram, setInstagram] = useState("")
    const [twitter, setTwitter] = useState("")
    const [certs, setCerts] = useState("")
    const [themeColor, setThemeColor] = useState("lime")
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState("")

    const fetchTeachers = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${serverUrl}/api/teachers`)
            setTeachers(res.data)
        } catch (error) {
            console.error(error)
            toast.error("Failed to load teachers list")
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchTeachers()
    }, [])

    const resetForm = () => {
        setName("")
        setRole("")
        setExp("")
        setInstagram("")
        setTwitter("")
        setCerts("")
        setThemeColor("lime")
        setImage(null)
        setImagePreview("")
        setShowForm(false)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!image) {
            toast.error("Please upload a profile image")
            return
        }

        setActionLoading(true)
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("role", role)
            formData.append("exp", exp)
            formData.append("instagram", instagram)
            formData.append("twitter", twitter)
            formData.append("certs", certs)
            formData.append("themeColor", themeColor)
            formData.append("image", image)

            const token = localStorage.getItem('adminToken')
            const authHeaders = token ? { Authorization: `Bearer ${token}` } : {}

            const result = await axios.post(`${serverUrl}/api/teachers`, formData, {
                headers: { 'Content-Type': 'multipart/form-data', ...authHeaders },
                withCredentials: true
            })

            if (result.data.success) {
                toast.success("Teacher profile created!")
                fetchTeachers()
                resetForm()
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Creation failed")
        }
        setActionLoading(false)
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this teacher profile?")) return
        try {
            const token = localStorage.getItem('adminToken')
            const headers = token ? { Authorization: `Bearer ${token}` } : {}
            await axios.delete(`${serverUrl}/api/teachers/${id}`, { headers, withCredentials: true })
            toast.success("Teacher profile removed")
            fetchTeachers()
        } catch (error) {
            toast.error("Failed to delete teacher profile")
        }
    }

    const inputClass = 'w-full h-[44px] rounded-xl px-[14px] text-gray-800 text-[14px] placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50 border border-gray-200'
    const labelClass = 'text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-[6px] block'

    return (
        <div className='w-[100vw] min-h-[100vh] bg-gray-50'>
            <Nav />
            <Sidebar />

            <div className='md:ml-[220px] pt-[80px] pb-[100px] md:pb-[32px] px-[16px] md:px-[32px]'>
                
                {/* Header */}
                <div className='flex justify-between items-center mb-[28px] flex-wrap gap-4'>
                    <div>
                        <h1 className='text-[26px] font-bold text-gray-900'>School Faculty</h1>
                        <p className='text-gray-400 text-[14px] mt-[4px]'>Manage profiles of teachers and admin staff</p>
                    </div>
                    {!showForm && (
                        <button
                            onClick={() => setShowForm(true)}
                            className='flex items-center gap-[8px] px-[24px] h-[46px] bg-gradient-to-r from-gray-900 to-black text-white rounded-full text-[14px] font-bold hover:shadow-lg hover:shadow-gray-200 border border-gray-800 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md'
                        >
                            <FiPlus size={18} /> Add Faculty
                        </button>
                    )}
                </div>

                {/* Form Section */}
                {showForm && (
                    <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[32px] max-w-[760px] mb-[32px] relative'>
                        <button 
                            onClick={resetForm} 
                            className='absolute right-[20px] top-[20px] text-gray-400 hover:text-gray-600'
                        >
                            <FiX size={20} />
                        </button>
                        <h2 className='text-[18px] font-bold text-gray-900 mb-[24px]'>Create Teacher Profile</h2>
                        
                        <form onSubmit={handleSubmit} className='flex flex-col gap-[24px]'>
                            
                            {/* Photo Upload */}
                            <div className='flex flex-wrap gap-[32px] items-center'>
                                <div>
                                    <label className={labelClass}>Profile Photo</label>
                                    <label htmlFor="teacher-image" className='cursor-pointer block'>
                                        <div className={`w-[110px] h-[110px] rounded-full border-2 overflow-hidden transition-all
                                            ${imagePreview ? 'border-black' : 'border-dashed border-gray-300 hover:border-gray-500 bg-gray-50'} flex items-center justify-center`}>
                                            <img
                                                src={imagePreview || uploadIcon}
                                                alt="Preview"
                                                className='w-full h-full object-cover'
                                            />
                                        </div>
                                        <input type="file" id="teacher-image" accept="image/*" hidden onChange={handleImageChange} required />
                                    </label>
                                </div>

                                <div className='flex-1 min-w-[200px] flex flex-col gap-[14px]'>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                        <div>
                                            <label className={labelClass}>Full Name</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. Dr. Ramesh Kumar" 
                                                className={inputClass} 
                                                value={name} 
                                                onChange={(e) => setName(e.target.value)} 
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Role / Subject Designation</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. HOD Mathematics" 
                                                className={inputClass} 
                                                value={role} 
                                                onChange={(e) => setRole(e.target.value)} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                        <div>
                                            <label className={labelClass}>Experience Tag</label>
                                            <input 
                                                type="text" 
                                                placeholder="e.g. 12+ Years Exp" 
                                                className={inputClass} 
                                                value={exp} 
                                                onChange={(e) => setExp(e.target.value)} 
                                                required 
                                            />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Faculty Theme Color</label>
                                            <select 
                                                className={inputClass} 
                                                value={themeColor} 
                                                onChange={(e) => setThemeColor(e.target.value)}
                                            >
                                                <option value="lime">Lime Green</option>
                                                <option value="cyan">Cyan Blue</option>
                                                <option value="pink">Pink</option>
                                                <option value="amber">Amber Yellow</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Certs and Socials */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-[20px]'>
                                <div>
                                    <label className={labelClass}>Instagram Profile URL</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. ramesh_maths" 
                                        className={inputClass} 
                                        value={instagram} 
                                        onChange={(e) => setInstagram(e.target.value)} 
                                    />
                                </div>
                                <div>
                                    <label className={labelClass}>Twitter Profile URL</label>
                                    <input 
                                        type="text" 
                                        placeholder="e.g. ramesh_maths" 
                                        className={inputClass} 
                                        value={twitter} 
                                        onChange={(e) => setTwitter(e.target.value)} 
                                    />
                                </div>
                            </div>

                            <div>
                                <label className={labelClass}>Degrees & Certifications (comma separated)</label>
                                <input 
                                    type="text" 
                                    placeholder="e.g. Ph.D. in Math, M.Sc. (IIT Delhi), B.Ed." 
                                    className={inputClass} 
                                    value={certs} 
                                    onChange={(e) => setCerts(e.target.value)} 
                                />
                            </div>

                            {/* Submit & Cancel */}
                            <div className='flex gap-[12px]'>
                                <button
                                    type="submit"
                                    className='px-[28px] h-[46px] rounded-full bg-gradient-to-r from-gray-900 to-black text-white font-bold text-[14px] flex items-center justify-center gap-[8px] hover:shadow-lg hover:shadow-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md'
                                    disabled={actionLoading}
                                >
                                    {actionLoading ? <Loading /> : "Add Profile"}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className='px-[24px] h-[46px] rounded-full border border-gray-200 bg-white text-gray-700 font-bold text-[14px] hover:bg-gray-50 active:scale-[0.98] transition-all duration-200 cursor-pointer'
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Teachers List Grid */}
                {loading ? (
                    <div className='text-center py-[60px] text-gray-500'>Loading faculty profiles...</div>
                ) : teachers.length === 0 ? (
                    <div className='bg-white rounded-2xl border border-gray-200 p-[40px] text-center text-gray-400 text-[15px]'>
                        No faculty profiles registered. Add your first profile above!
                    </div>
                ) : (
                    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px]'>
                        {teachers.map((item) => (
                            <div 
                                key={item._id} 
                                className='bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between group'
                            >
                                <div className='relative overflow-hidden aspect-square bg-gray-100'>
                                    <img 
                                        src={item.image ? (item.image.startsWith('http') ? item.image : `${serverUrl}${item.image}`) : ''} 
                                        alt={item.name} 
                                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-300' 
                                    />
                                </div>
                                <div className='p-[12px] border-t border-gray-100 flex items-center justify-between'>
                                    <div className='truncate pr-[8px]'>
                                        <h3 className='font-bold text-gray-800 text-[13px] truncate'>{item.name}</h3>
                                        <p className='text-gray-400 text-[10px] mt-0.5 truncate'>{item.role}</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className='w-[30px] h-[30px] rounded-lg border border-gray-200 bg-white flex items-center justify-center text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all flex-shrink-0'
                                        title="Delete Profile"
                                    >
                                        <FiTrash2 size={13} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Teachers
