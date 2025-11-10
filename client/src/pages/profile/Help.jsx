import React from "react";
import { HelpCircle, Mail, MessageSquare, BookOpen } from "lucide-react";

const Help = () => {
  const faqs = [
    {
      question: "How do I join a meeting?",
      answer:
        "Go to your Dashboard, find the meeting, and click on 'Join Meeting'. Make sure your camera and microphone permissions are enabled.",
    },
    {
      question: "How can I reset my password?",
      answer:
        "Visit the Login page and click 'Forgot Password'. Follow the instructions sent to your registered email address.",
    },
    {
      question: "Can I reschedule an interview?",
      answer:
        "Yes, contact your interviewer directly or use the 'Reschedule' option if available on your dashboard.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <HelpCircle className="text-blue-600" /> Help & Support
        </h1>

        {/* FAQs */}
        <div className="space-y-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <BookOpen className="text-blue-500" /> Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gray-50 p-4 rounded-xl border border-gray-200"
            >
              <h3 className="font-semibold text-gray-900">{faq.question}</h3>
              <p className="text-gray-700 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <MessageSquare className="text-blue-500" /> Contact Support
          </h2>
          <p className="text-gray-700 mb-4">
            If you still need help, feel free to contact our support team.
          </p>
          <a
            href="mailto:support@smarttask.com"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
          >
            <Mail size={18} /> Email Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Help;
