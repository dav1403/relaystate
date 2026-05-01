"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function ContactPage() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    fetch("https://formspree.io/f/xnnqwkbo", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    })
      .then((r) => r.ok && setSent(true))
      .catch(() => setSent(true));
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#0B1F3A] mb-3">{t("title")}</h1>
        <p className="text-gray-500">{t("subtitle")}</p>
      </div>

      {sent ? (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-2xl p-8 text-center font-semibold">
          {t("success")}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("name")}</label>
              <input
                name="name"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A850]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("email")}</label>
              <input
                name="email"
                type="email"
                required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A850]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("phone")}</label>
              <input
                name="phone"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A850]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("country")}</label>
              <input
                name="country"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A850]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("budget")}</label>
              <input
                name="budget"
                placeholder={t("budget_placeholder")}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A850]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t("rooms")}</label>
              <select
                name="rooms"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A850] bg-white"
              >
                {[2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>{n}+</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t("message")}</label>
            <textarea
              name="message"
              rows={4}
              placeholder={t("message_placeholder")}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A850] resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0B1F3A] text-white font-bold py-4 rounded-xl hover:bg-[#C9A850] hover:text-[#0B1F3A] transition-colors text-sm"
          >
            {t("submit")}
          </button>
        </form>
      )}
    </div>
  );
}
