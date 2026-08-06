import React from "react";

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Maqsad-e-Quran Academy",
    "alternateName": "Maqsad e Quran Academy",
    "url": "https://maqsadquran.com",
    "logo": "https://maqsadquran.com/logo.png",
    "description":
      "Online 1-on-1 live Quran classes for kids and adults with qualified male and female certified teachers worldwide.",
    "telephone": "+92-300-0000000",
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com",
      "https://youtube.com"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PK"
    }
  };

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Online Quran Reading with Tajweed Rules",
    "description":
      "Comprehensive live 1-on-1 online Tajweed course designed to help students read Quran fluently with correct pronunciation.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "Maqsad-e-Quran Academy",
      "sameAs": "https://maqsadquran.com"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT30M"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does the Free 3-Day Trial work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can register for a Free 3-Day Trial without providing any credit card. We will match you with a certified teacher based on your preferred schedule."
        }
      },
      {
        "@type": "Question",
        "name": "Are female Quran teachers available for sisters and daughters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we have dedicated, qualified female Quran teachers (Alimahs and Hafizahs) available for female students and kids."
        }
      },
      {
        "@type": "Question",
        "name": "What courses are available at Maqsad-e-Quran Academy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We offer Noorani Qaida for beginners, Quran with Tajweed, Quran Hifz (Memorization), Quran Translation & Tafseer, and Daily Islamic Studies."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
