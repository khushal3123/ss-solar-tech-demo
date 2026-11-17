import React from 'react';
import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';

export const metadata: Metadata = {
  title: 'Book Free Solar Consultation in Indore | Contact SS Solar',
  description:
    'Schedule a free rooftop solar site survey, shadow analysis, and subsidy consultation in Indore, Madhya Pradesh with SS Solar.',
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        badge="Free Rooftop Consultation"
        title="Schedule Your Free Solar Site Survey in Indore"
        subtitle="Connect with our Indore engineering desk for a personalized rooftop layout, PM Surya Ghar subsidy check, and monthly EMI plan."
        breadcrumb="Contact Us"
      />
      <ContactForm />
      <FAQ />
    </>
  );
}
