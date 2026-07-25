import React, { useState, useContext, useEffect } from 'react'
import Nav from '../component/Nav'
import Sidebar from '../component/Sidebar'
import { authDataContext } from '../context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../component/Loading'
import { FiSave } from 'react-icons/fi'

const Section = ({ n, title, children }) => (
    <div>
        <h3 className='text-[15px] font-bold text-gray-800 border-b border-gray-100 pb-2 mb-4'>{n}. {title}</h3>
        {children}
    </div>
)

function Settings() {
    const { serverUrl } = useContext(authDataContext)
    const [loading, setLoading] = useState(false)
    const [actionLoading, setActionLoading] = useState(false)

    // ── 1. General Branding ───────────────────────────────────
    const [schoolName, setSchoolName] = useState('')
    const [logoText, setLogoText] = useState('')

    // ── 2. Hero Section ───────────────────────────────────────
    const [heroTitle1, setHeroTitle1] = useState('')
    const [heroTitle2, setHeroTitle2] = useState('')
    const [heroSubheadline, setHeroSubheadline] = useState('')

    // ── 3. Hero Stat Counters ─────────────────────────────────
    const [happyStudents, setHappyStudents] = useState('')
    const [expertTeachers, setExpertTeachers] = useState('')
    const [boardPassRate, setBoardPassRate] = useState('')

    // ── 4. About Section Counters ─────────────────────────────
    const [yearsOfExcellence, setYearsOfExcellence] = useState('')
    const [studentsEnrolled, setStudentsEnrolled] = useState('')
    const [smartClassrooms, setSmartClassrooms] = useState('')
    const [estYear, setEstYear] = useState('')
    const [estTagline, setEstTagline] = useState('')

    // ── 5. Contact & Footer ───────────────────────────────────
    const [contactEmail, setContactEmail] = useState('')
    const [ownerPhone, setOwnerPhone] = useState('')
    const [receptionPhone, setReceptionPhone] = useState('')
    const [contactPhone, setContactPhone] = useState('')
    const [whatsappNumber, setWhatsappNumber] = useState('')
    const [contactAddress, setContactAddress] = useState('')
    const [instagramId, setInstagramId] = useState('')
    const [mapUrl, setMapUrl] = useState('')

    // ── 6. Fee Tags ───────────────────────────────────────────
    const [prospectusPrice, setProspectusPrice] = useState('')
    const [prospectusPeriod, setProspectusPeriod] = useState('')
    const [tuitionPrice, setTuitionPrice] = useState('')
    const [tuitionPeriod, setTuitionPeriod] = useState('')
    const [securityPrice, setSecurityPrice] = useState('')
    const [securityPeriod, setSecurityPeriod] = useState('')

    // ── 7. About Photo ────────────────────────────────────────
    const [aboutPhotoPreview, setAboutPhotoPreview] = useState('')
    const [aboutPhotoFile, setAboutPhotoFile] = useState(null)
    const [photoUploading, setPhotoUploading] = useState(false)

    // ── 8. Hero Background Photo ──────────────────────────────
    const [heroBgPhotoPreview, setHeroBgPhotoPreview] = useState('')
    const [heroBgPhotoFile, setHeroBgPhotoFile] = useState(null)
    const [heroBgUploading, setHeroBgUploading] = useState(false)

    // ─────────────────────────────────────────────────────────
    const getToken = () => {
        const token = localStorage.getItem('adminToken')
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    const fetchSettings = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${serverUrl}/api/settings`)
            const d = res.data
            // Map both school + gym field names for backward compatibility
            setSchoolName(d.schoolName || d.gymName || '')
            setLogoText(d.logoText || '')
            setHeroTitle1(d.heroTitle1 || '')
            setHeroTitle2(d.heroTitle2 || '')
            setHeroSubheadline(d.heroSubheadline || '')
            setHappyStudents(d.happyStudents || d.membersActive || '')
            setExpertTeachers(d.expertTeachers || d.eliteCoaches || '')
            setBoardPassRate(d.boardPassRate || d.successRate || '')
            setYearsOfExcellence(d.yearsOfExcellence || d.aboutYears || '')
            setStudentsEnrolled(d.studentsEnrolled || d.aboutMembers || '')
            setSmartClassrooms(d.smartClassrooms || d.aboutCoaches || '')
            setEstYear(d.estYear || '')
            setEstTagline(d.estTagline || '')
            setContactEmail(d.contactEmail || '')
            setOwnerPhone(d.ownerPhone || '')
            setReceptionPhone(d.receptionPhone || '')
            setContactPhone(d.contactPhone || '')
            setWhatsappNumber(d.whatsappNumber || '')
            setContactAddress(d.contactAddress || '')
            setInstagramId(d.instagramId || '')
            setMapUrl(d.mapUrl || '')
            setProspectusPrice(d.basicPrice || d.prospectusPrice || '')
            setProspectusPeriod(d.basicPeriod || d.prospectusPeriod || '')
            setTuitionPrice(d.standardPrice || d.tuitionPrice || '')
            setTuitionPeriod(d.standardPeriod || d.tuitionPeriod || '')
            setSecurityPrice(d.elitePrice || d.securityPrice || '')
            setSecurityPeriod(d.elitePeriod || d.securityPeriod || '')
            setAboutPhotoPreview(d.aboutPhoto || '')
            setHeroBgPhotoPreview(d.heroBgPhoto || '')
        } catch (error) {
            console.error(error)
            toast.error('Failed to load settings')
        }
        setLoading(false)
    }

    useEffect(() => { fetchSettings() }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setActionLoading(true)
        try {
            const payload = {
                // Send both field name variants so it works with existing DB schema
                schoolName, gymName: schoolName,
                logoText,
                heroTitle1, heroTitle2, heroSubheadline,
                happyStudents, membersActive: happyStudents,
                expertTeachers, eliteCoaches: expertTeachers,
                boardPassRate, successRate: boardPassRate,
                yearsOfExcellence, aboutYears: yearsOfExcellence,
                studentsEnrolled, aboutMembers: studentsEnrolled,
                smartClassrooms, aboutCoaches: smartClassrooms,
                estYear, estTagline,
                contactEmail, ownerPhone, receptionPhone, contactPhone, whatsappNumber, contactAddress, instagramId, mapUrl,
                basicPrice: prospectusPrice, basicPeriod: prospectusPeriod,
                standardPrice: tuitionPrice, standardPeriod: tuitionPeriod,
                elitePrice: securityPrice, elitePeriod: securityPeriod,
            }
            const res = await axios.post(`${serverUrl}/api/settings`, payload, {
                headers: getToken(), withCredentials: true
            })
            if (res.data.success) toast.success('Settings saved successfully!')
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Failed to save settings')
        }
        setActionLoading(false)
    }

    const handleAboutPhotoChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setAboutPhotoFile(file)
        setAboutPhotoPreview(URL.createObjectURL(file))
    }

    const handleAboutPhotoUpload = async () => {
        if (!aboutPhotoFile) return toast.error('Please select a photo first')
        setPhotoUploading(true)
        try {
            const formData = new FormData()
            formData.append('photo', aboutPhotoFile)
            const res = await axios.post(`${serverUrl}/api/settings/about-photo`, formData, {
                headers: { ...getToken(), 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            if (res.data.success) {
                setAboutPhotoFile(null)
                if (res.data.aboutPhoto) setAboutPhotoPreview(res.data.aboutPhoto)
                toast.success('About photo uploaded!')
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Failed to upload about photo')
        }
        setPhotoUploading(false)
    }

    const handleHeroBgPhotoChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setHeroBgPhotoFile(file)
        setHeroBgPhotoPreview(URL.createObjectURL(file))
    }

    const handleHeroBgPhotoUpload = async () => {
        if (!heroBgPhotoFile) return toast.error('Please select a photo first')
        setHeroBgUploading(true)
        try {
            const formData = new FormData()
            formData.append('photo', heroBgPhotoFile)
            const res = await axios.post(`${serverUrl}/api/settings/hero-bg-photo`, formData, {
                headers: { ...getToken(), 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            })
            if (res.data.success) {
                setHeroBgPhotoFile(null)
                if (res.data.heroBgPhoto) setHeroBgPhotoPreview(res.data.heroBgPhoto)
                toast.success('Hero background uploaded!')
            }
        } catch (error) {
            console.error(error)
            toast.error(error.response?.data?.message || 'Failed to upload hero background')
        }
        setHeroBgUploading(false)
    }

    const ic = 'w-full h-[44px] rounded-xl px-[14px] text-gray-800 text-[14px] placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50 border border-gray-200'
    const lc = 'text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-[6px] block'
    const ta = 'w-full h-[80px] rounded-xl px-[14px] py-[10px] text-gray-800 text-[14px] placeholder-gray-300 outline-none focus:ring-2 focus:ring-gray-300 bg-gray-50 border border-gray-200 resize-none'


    return (
        <div className='w-[100vw] min-h-[100vh] bg-gray-50'>
            <Nav />
            <Sidebar />

            <div className='md:ml-[220px] pt-[80px] pb-[100px] md:pb-[32px] px-[16px] md:px-[32px]'>

                {/* Header */}
                <div className='mb-[28px]'>
                    <h1 className='text-[26px] font-bold text-gray-900'>General Settings</h1>
                    <p className='text-gray-400 text-[14px] mt-[4px]'>Customize the school name, hero text, counters, contact info and fee tags</p>
                </div>

                {loading ? (
                    <div className='text-center py-[60px] text-gray-500'>Loading settings...</div>
                ) : (
                    <div className='max-w-[820px] flex flex-col gap-6'>

                        {/* Main Settings Form */}
                        <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[32px]'>
                            <form onSubmit={handleSubmit} className='flex flex-col gap-[28px]'>

                                {/* 1. Branding */}
                                <Section n='1' title='General Branding'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px]'>
                                        <div>
                                            <label className={lc}>School Name</label>
                                            <input type='text' className={ic} value={schoolName} onChange={e => setSchoolName(e.target.value)} placeholder='e.g. A B Public School' required />
                                        </div>
                                        <div>
                                            <label className={lc}>Header Logo Text</label>
                                            <input type='text' className={ic} value={logoText} onChange={e => setLogoText(e.target.value)} placeholder='e.g. AB Public School' required />
                                        </div>
                                    </div>
                                </Section>

                                {/* 2. Hero */}
                                <Section n='2' title='Hero Headline & Text'>
                                    <div className='flex flex-col gap-[16px]'>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px]'>
                                            <div>
                                                <label className={lc}>Headline Line 1</label>
                                                <input type='text' className={ic} value={heroTitle1} onChange={e => setHeroTitle1(e.target.value)} placeholder='e.g. Empowering' required />
                                            </div>
                                            <div>
                                                <label className={lc}>Headline Line 2</label>
                                                <input type='text' className={ic} value={heroTitle2} onChange={e => setHeroTitle2(e.target.value)} placeholder='e.g. Young Minds' required />
                                            </div>
                                        </div>
                                        <div>
                                            <label className={lc}>Hero Subheadline</label>
                                            <textarea className={ta} value={heroSubheadline} onChange={e => setHeroSubheadline(e.target.value)} placeholder='Brief tagline shown below the headline' required />
                                        </div>
                                    </div>
                                </Section>

                                {/* 3. Hero Stats */}
                                <Section n='3' title='Homepage Stat Counters'>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-[20px]'>
                                        <div>
                                            <label className={lc}>Students Active</label>
                                            <input type='text' className={ic} value={happyStudents} onChange={e => setHappyStudents(e.target.value)} placeholder='e.g. 1500+' required />
                                        </div>
                                        <div>
                                            <label className={lc}>Expert Teachers</label>
                                            <input type='text' className={ic} value={expertTeachers} onChange={e => setExpertTeachers(e.target.value)} placeholder='e.g. 80+' required />
                                        </div>
                                        <div>
                                            <label className={lc}>Board Pass Rate</label>
                                            <input type='text' className={ic} value={boardPassRate} onChange={e => setBoardPassRate(e.target.value)} placeholder='e.g. 100%' required />
                                        </div>
                                    </div>
                                </Section>

                                {/* 4. About Stats */}
                                <Section n='4' title='About Section Counters'>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-[20px]'>
                                        <div>
                                            <label className={lc}>Years of Excellence</label>
                                            <input type='text' className={ic} value={yearsOfExcellence} onChange={e => setYearsOfExcellence(e.target.value)} placeholder='e.g. 20' required />
                                        </div>
                                        <div>
                                            <label className={lc}>Students Enrolled</label>
                                            <input type='text' className={ic} value={studentsEnrolled} onChange={e => setStudentsEnrolled(e.target.value)} placeholder='e.g. 8500' required />
                                        </div>
                                        <div>
                                            <label className={lc}>Smart Classrooms</label>
                                            <input type='text' className={ic} value={smartClassrooms} onChange={e => setSmartClassrooms(e.target.value)} placeholder='e.g. 30' required />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px] mt-4'>
                                        <div>
                                            <label className={lc}>EST. Year (Photo Badge)</label>
                                            <input type='text' className={ic} value={estYear} onChange={e => setEstYear(e.target.value)} placeholder='e.g. 2006' />
                                        </div>
                                        <div>
                                            <label className={lc}>EST. Tagline (Photo Badge)</label>
                                            <input type='text' className={ic} value={estTagline} onChange={e => setEstTagline(e.target.value)} placeholder='e.g. 20 Years of Educational Dedication' />
                                        </div>
                                    </div>
                                </Section>

                                {/* 5. Contact */}
                                <Section n='5' title='Footer Contact & Social Details'>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-4'>
                                        <div>
                                            <label className={lc}>Contact Email</label>
                                            <input type='email' className={ic} value={contactEmail} onChange={e => setContactEmail(e.target.value)} placeholder='info@abpublicschool.edu.in' required />
                                        </div>
                                        <div>
                                            <label className={lc}>Principal Hotline</label>
                                            <input type='text' className={ic} value={ownerPhone} onChange={e => setOwnerPhone(e.target.value)} placeholder='e.g. 9876543210' />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-[20px] mb-4'>
                                        <div>
                                            <label className={lc}>Reception Phone</label>
                                            <input type='text' className={ic} value={receptionPhone} onChange={e => setReceptionPhone(e.target.value)} placeholder='e.g. 9876543211' />
                                        </div>
                                        <div>
                                            <label className={lc}>Contact Phone (Page Display)</label>
                                            <input type='text' className={ic} value={contactPhone} onChange={e => setContactPhone(e.target.value)} placeholder='e.g. +91 11 2345 6789' />
                                        </div>
                                        <div>
                                            <label className={lc}>WhatsApp Number (Inquiries)</label>
                                            <input type='text' className={ic} value={whatsappNumber} onChange={e => setWhatsappNumber(e.target.value)} placeholder='e.g. 9808433521' />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-4'>
                                        <div>
                                            <label className={lc}>School Address</label>
                                            <input type='text' className={ic} value={contactAddress} onChange={e => setContactAddress(e.target.value)} placeholder='Sector 15, New Delhi - 110001' required />
                                        </div>
                                        <div>
                                            <label className={lc}>Instagram Username</label>
                                            <input type='text' className={ic} value={instagramId} onChange={e => setInstagramId(e.target.value)} placeholder='e.g. abpublicschool' />
                                        </div>
                                    </div>
                                    <div>
                                        <label className={lc}>Google Maps Share / Embed Link (Optional)</label>
                                        <input type='text' className={ic} value={mapUrl} onChange={e => setMapUrl(e.target.value)} placeholder='e.g. https://maps.google.com/?q=AB+Public+School' />
                                    </div>
                                </Section>

                                {/* 6. Fee Tags */}
                                <Section n='6' title='Fees & Prospectus Cost Tags'>
                                    <div className='flex flex-col gap-5'>
                                        <div>
                                            <h4 className='text-[13px] font-bold text-gray-600 mb-3 uppercase tracking-wider'>Prospectus & Form Cost</h4>
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px]'>
                                                <div>
                                                    <label className={lc}>Prospectus Cost (₹)</label>
                                                    <input type='text' className={ic} value={prospectusPrice} onChange={e => setProspectusPrice(e.target.value)} placeholder='e.g. Free' required />
                                                </div>
                                                <div>
                                                    <label className={lc}>Description Tag</label>
                                                    <input type='text' className={ic} value={prospectusPeriod} onChange={e => setProspectusPeriod(e.target.value)} placeholder='e.g. Admission Prospectus' required />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className='text-[13px] font-bold text-gray-600 mb-3 uppercase tracking-wider'>Average Class Fees Tag</h4>
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px]'>
                                                <div>
                                                    <label className={lc}>Tuition Fee Tag (₹)</label>
                                                    <input type='text' className={ic} value={tuitionPrice} onChange={e => setTuitionPrice(e.target.value)} placeholder='e.g. Contact Us' required />
                                                </div>
                                                <div>
                                                    <label className={lc}>Description Tag</label>
                                                    <input type='text' className={ic} value={tuitionPeriod} onChange={e => setTuitionPeriod(e.target.value)} placeholder='e.g. Quarterly Fees' required />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className='text-[13px] font-bold text-gray-600 mb-3 uppercase tracking-wider'>Admission Security Tag</h4>
                                            <div className='grid grid-cols-1 md:grid-cols-2 gap-[20px]'>
                                                <div>
                                                    <label className={lc}>Security Fee Tag (₹)</label>
                                                    <input type='text' className={ic} value={securityPrice} onChange={e => setSecurityPrice(e.target.value)} placeholder='e.g. Inquire' required />
                                                </div>
                                                <div>
                                                    <label className={lc}>Description Tag</label>
                                                    <input type='text' className={ic} value={securityPeriod} onChange={e => setSecurityPeriod(e.target.value)} placeholder='e.g. Annual Enrollment' required />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Section>

                                {/* Submit */}
                                <button
                                    type='submit'
                                    className='w-fit px-[32px] h-[46px] rounded-full bg-gradient-to-r from-gray-900 to-black text-white font-bold text-[14px] flex items-center justify-center gap-[8px] hover:shadow-lg hover:shadow-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-md'
                                    disabled={actionLoading}
                                >
                                    {actionLoading ? <Loading /> : <><FiSave /> Save All Settings</>}
                                </button>

                            </form>
                        </div>

                        {/* 7. Hero Background Photo */}
                        <div className='bg-white rounded-2xl border border-gray-200 shadow-sm p-[32px]'>
                            <h3 className='text-[15px] font-bold text-gray-800 border-b border-gray-100 pb-2 mb-2'>7. Home Page Background Image</h3>
                            <p className='text-[12px] text-gray-400 mb-5'>Upload the full-screen background image shown on the Homepage hero section.</p>
                            <div className='flex flex-col md:flex-row gap-6 items-start'>
                                <div className='w-full md:w-[200px] h-[130px] rounded-xl overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0'>
                                    {heroBgPhotoPreview ? (
                                        <img src={heroBgPhotoPreview.startsWith('http') || heroBgPhotoPreview.startsWith('blob:') ? heroBgPhotoPreview : `${serverUrl}${heroBgPhotoPreview.startsWith('/') ? heroBgPhotoPreview : '/' + heroBgPhotoPreview}`} alt='Hero BG' className='w-full h-full object-cover' />
                                    ) : (
                                        <div className='w-full h-full flex items-center justify-center text-gray-400 text-[12px]'>No Photo</div>
                                    )}
                                </div>
                                <div className='flex flex-col gap-4 flex-1'>
                                    <div>
                                        <label className={lc}>Choose New Background Image</label>
                                        <input type='file' accept='image/*' onChange={handleHeroBgPhotoChange}
                                            className='w-full text-[13px] text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-[12px] file:font-semibold file:bg-gray-900 file:text-white hover:file:bg-gray-700 cursor-pointer' />
                                    </div>
                                    {heroBgPhotoFile && (
                                        <p className='text-[11px] text-gray-400'>Selected: {heroBgPhotoFile.name} ({(heroBgPhotoFile.size / 1024 / 1024).toFixed(2)} MB)</p>
                                    )}
                                    <button type='button' onClick={handleHeroBgPhotoUpload} disabled={heroBgUploading || !heroBgPhotoFile}
                                        className='w-fit px-[24px] h-[42px] rounded-full bg-gradient-to-r from-gray-900 to-black text-white font-bold text-[13px] flex items-center justify-center gap-[8px] hover:shadow-lg transition-all duration-200 cursor-pointer shadow-md disabled:opacity-40 disabled:cursor-not-allowed'>
                                        {heroBgUploading ? <Loading /> : <><FiSave /> Upload Background</>}
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default Settings
