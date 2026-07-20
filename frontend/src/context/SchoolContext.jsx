import React, { createContext, useState, useEffect } from 'react';

export const SchoolContext = createContext();

export function SchoolProvider({ children }) {
  const serverUrl = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/+$/, "");

  const [settings, setSettings] = useState(null);
  const [notices, setNotices] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/settings`);
      const data = await res.json();
      setSettings(data);
    } catch (err) {
      console.error("Failed to fetch settings from backend", err);
    }
  };

  const fetchNotices = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/notices`);
      const data = await res.json();
      setNotices(data);
    } catch (err) {
      console.error("Failed to fetch notices", err);
    }
  };

  const fetchTeachers = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/teachers`);
      const data = await res.json();
      setTeachers(data);
    } catch (err) {
      console.error("Failed to fetch teachers", err);
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${serverUrl}/api/gallery`);
      const data = await res.json();
      setGallery(data);
    } catch (err) {
      console.error("Failed to fetch gallery images", err);
    }
  };

  const submitAdmission = async (formData) => {
    try {
      const res = await fetch(`${serverUrl}/api/admissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      return await res.json();
    } catch (err) {
      console.error("Failed to submit admission inquiry", err);
      return { success: false, message: err.message };
    }
  };

  const submitInquiry = async (formData) => {
    try {
      const res = await fetch(`${serverUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      return await res.json();
    } catch (err) {
      console.error("Failed to submit contact inquiry", err);
      return { success: false, message: err.message };
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchSettings(),
        fetchNotices(),
        fetchTeachers(),
        fetchGallery()
      ]);
      setLoading(false);
    };
    loadAllData();
  }, []);

  const value = {
    serverUrl,
    settings,
    notices,
    teachers,
    gallery,
    loading,
    submitAdmission,
    submitInquiry,
    refreshData: () => {
      fetchSettings();
      fetchNotices();
      fetchTeachers();
      fetchGallery();
    }
  };

  return (
    <SchoolContext.Provider value={value}>
      {children}
    </SchoolContext.Provider>
  );
}
