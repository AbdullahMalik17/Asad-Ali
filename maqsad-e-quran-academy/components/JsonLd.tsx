import React from "react";

export default function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Maqsad-e-Quran Academy",
    "alternateName": ["Maqsad e Quran Academy", "Maqsad Quran Online"],
    "url": "https://maqsadquran.com",
    "logo": "https://maqsadquran.com/logo.png",
    "description":
      "Premier global online Quran academy offering 1-on-1 live classes with certified male and female scholars from Al-Azhar and Wifaq-ul-Madaris.",
    "telephone": "+92-330-1676985",
    "email": "maqsadquran@gmail.com",
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com",
      "https://youtube.com"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PK"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const courseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "Noorani Qaida for Kids & Beginners",
        "description": "Foundational course teaching Arabic letters, correct Makharij, Harakaat, and compound word connections.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Maqsad-e-Quran Academy",
          "sameAs": "https://maqsadquran.com"
        }
      },
      {
        "@type": "Course",
        "name": "Tajweed-ul-Quran (Rules & Makharij)",
        "description": "Comprehensive 1-on-1 online Tajweed course to recite Quran fluently with theoretical and practical rules.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Maqsad-e-Quran Academy",
          "sameAs": "https://maqsadquran.com"
        }
      },
      {
        "@type": "Course",
        "name": "Hifz-ul-Quran (Quran Memorization)",
        "description": "Systematic 3-pillar memorization program: Sabaq, Sabaqi, and Manzil with certified Hafiz scholars.",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Maqsad-e-Quran Academy",
          "sameAs": "https://maqsadquran.com"
        }
      },
      {
        "@type": "Course",
        "name": "Sisters Exclusive Quran & Tajweed Program",
        "description": "100% private 1-on-1 Quran and Tajweed classes taught exclusively by certified female scholars (Alimahs).",
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Maqsad-e-Quran Academy",
          "sameAs": "https://maqsadquran.com"
        }
      }
    ]
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
        "name": "Are certified female Quran teachers available for sisters and daughters?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we have over 20+ dedicated, qualified female Quran teachers (Alimahs and Hafizahs) available for female students and children in a 100% private setting."
        }
      },
      {
        "@type": "Question",
        "name": "What currencies and payment methods are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support USD, GBP, CAD, AUD, EUR, AED, and PKR via Credit Cards, PayPal, Stripe, and local bank transfers."
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
