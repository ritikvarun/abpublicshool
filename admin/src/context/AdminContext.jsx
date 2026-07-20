import React, { createContext, useContext, useEffect, useState } from 'react'
import { authDataContext } from './AuthContext'
import axios from 'axios'

export const adminDataContext = createContext()
function AdminContext({children}) {
    let [adminData, setAdminData] = useState(null)
    let [loading, setLoading] = useState(true)
    let { serverUrl } = useContext(authDataContext)

    const getAdmin = async () => {
        try {
            const token = localStorage.getItem('adminToken')
            // Clear old invalid fallback tokens
            if (!token || token === 'fallback-local-admin-token') {
                localStorage.removeItem('adminToken')
                setAdminData(null)
                setLoading(false)
                return
            }

            const headers = { Authorization: `Bearer ${token}` }
            const result = await axios.get(serverUrl + '/api/auth/getadmin', { headers, withCredentials: true })

            if (result.data.success) {
                setAdminData(result.data)
            } else {
                localStorage.removeItem('adminToken')
                setAdminData(null)
            }
            setLoading(false)
        } catch (error) {
            const status = error.response?.status
            // 401 = token expired / invalid → force re-login
            if (status === 401) {
                localStorage.removeItem('adminToken')
                setAdminData(null)
            } else {
                // Network error or server down — keep token, allow admin to retry
                const token = localStorage.getItem('adminToken')
                if (token) {
                    setAdminData({ email: 'admin@school.com', role: 'admin', isFallback: true })
                } else {
                    setAdminData(null)
                }
            }
            setLoading(false)
        }
    }

    useEffect(() => {
        getAdmin()
    }, [])

    let value = { adminData, setAdminData, getAdmin, loading }
    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    )
}

export default AdminContext