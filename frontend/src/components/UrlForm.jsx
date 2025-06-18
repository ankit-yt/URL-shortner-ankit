import React, { useEffect, useRef, useState } from "react";
import {
  createCustomUrl,
  CreateShortUrl,
  deleteUrl,
} from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { getAllUserUrls } from "../api/user.api";
import { FiChevronDown, FiCopy, FiTrash2 } from "react-icons/fi";
import Lottie from "lottie-react";
import loader from '../assets/animation/loader.json'
import { MdDeleteForever } from "react-icons/md";
import urlLoading from '../assets/animation/urlLoading.json'

function UrlForm() {
  const [value, setValue] = useState("");
  const [shortLink, setShortLink] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedUrlId, setCopiedUrlId] = useState(null);
  const [userUrls, setUserUrls] = useState([]);
  const [isCustom, setIsCustom] = useState(false);
  const [customUrl, setCustomUrl] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [isUrlLoading, setIsUrlLoading] = useState(false)
  const [isUrlShortning, setIsUrlShortning] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  
  const [activeDropdown, setActiveDropdown] = useState(null);

  const auth = useSelector((state) => state.auth);
  const authenticated = auth.isAuthenticated;
  // Replace later with real user data

  useEffect(() => {
    const fetchUrl = async () => {
      if (authenticated) {
        setIsUrlLoading(true)
        const response = await getAllUserUrls();
        setUserUrls(response.data.urls);
        setIsUrlLoading(false)
      }
    };

    fetchUrl();
  }, [authenticated, shortLink, trigger]);

  const handleSubmit = async () => {
    if (!value) return;
    try {
      setIsUrlShortning(true)
      const response = isCustom
        ? await createCustomUrl(value, customUrl)
        : await CreateShortUrl(value);
      setShortLink(response.data.shortUrl);
      setValue("");
      setCustomUrl("");
      setIsUrlShortning(false)
      
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong");
    }
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log(id);
      setCopiedUrlId(id);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setCopiedUrlId(null);
      }, 1000);
    });
  };

  const handleDelete = async (id) => {
    setIsLoading(true);
    await deleteUrl(id);
    setTrigger(!trigger);
    setActiveDropdown(null);
    setIsLoading(false);
  };

  return (
    <>
      {/* 🔗 Elegant URL Shortener Box */}
      <div className="rounded-2xl p-4 sm:p-6 md:p-8  bg-white md:shadow-xl shadow-sm space-y-6 border border-gray-200 transition-all duration-300 ease-in-out  ">
       
        {/* 🌐 URL Input Row */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input
            type="text"
            onChange={(e) => setValue(e.target.value)}
            value={value}
            placeholder="Paste your long URL here..."
            className="w-full truncate sm:flex-1 px-4 py-2 sm:px-5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm shadow-sm placeholder-gray-400"
          />
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-sm shadow-md"
          >
            {isUrlShortning ? "Shortening..." : "✂️ Shorten"}
          </button>
        </div>

        {/* 🔐 Authenticated Controls */}
        {authenticated && (
          <div className="space-y-4">
            {/* 🔁 Elegant Toggle Switch */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm font-medium text-gray-700 gap-2">
              <span>URL Type:</span>
              <div className="inline-flex bg-gray-100 rounded-full p-1 shadow-inner self-start sm:self-auto">
                <button
                  onClick={() => setIsCustom(false)}
                  className={`px-4 py-1 rounded-full transition-all duration-200 ${
                    !isCustom
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Random
                </button>
                <button
                  onClick={() => setIsCustom(true)}
                  className={`px-4 py-1 rounded-full transition-all duration-200 ${
                    isCustom
                      ? "bg-blue-600 text-white shadow"
                      : "text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Custom
                </button>
              </div>
            </div>

            {/* ✏️ Custom URL Input */}
            {isCustom && (
              <input
                type="text"
                placeholder="Enter custom alias (e.g. my-link)"
                className="w-full px-4 py-2 sm:px-5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm shadow-sm placeholder-gray-400"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
              />
            )}
          </div>
        )}
      </div>

      {/* 📋 Display Shortened URL */}
      {shortLink && (
        <div className="mt-6 bg-white border border-gray-200 rounded-2xl p-5 shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4 transition-all duration-300 ease-in-out">
          {/* 🔗 Short Link */}
          <div className="flex-1 text-gray-800 font-medium text-sm md:text-base overflow-hidden">
            <a
              href={shortLink}
              target="_blank"
              rel="noopener noreferrer"
              className="truncate block w-full max-w-full sm:max-w-[350px] text-blue-600 hover:underline"
            >
              {shortLink}
            </a>
          </div>

          {/* 📎 Copy Button */}
          <button
            onClick={() => handleCopy(shortLink, 1)}
            className={`relative px-5 py-2 rounded-md font-semibold text-white transition-all duration-300 ease-in-out min-w-[90px] text-sm shadow-md
        ${
          copied && copiedUrlId === 1
            ? "bg-green-600 hover:bg-green-700"
            : "bg-blue-600 hover:bg-blue-700"
        }
      `}
          >
            {copied && copiedUrlId === 1 ? "Copied!" : "Copy"}
          </button>
        </div>
      )}

      {/* 📊 Created Links */}
      {authenticated && (
        <div className="bg-white overflow-x-hidden shadow-md mt-10 rounded-2xl p-4 sm:p-8 border border-gray-200 transition-all duration-300">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
            🔗 Your Created Links
          </h2>

         

          {/* ⚠️ No links available */}

        {!isUrlLoading ? (
          ( userUrls.length === 0  )? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-4">😅</div>
              <p className="text-lg font-medium">
                You haven’t shortened any links yet.
              </p>
              <p className="text-sm mt-1">
                Paste a long URL above and click{" "}
                <span className="font-semibold text-blue-600">Shorten</span> to
                get started!
              </p>
            </div>
          ) : (
            <>
              {/* 🧾 TABLE VIEW FOR DESKTOP */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-800">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs">
                    <tr>
                      <th className="px-6 py-3">Original URL</th>
                      <th className="px-6 py-3">Shortened URL</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userUrls.map((link) => {
                      const finalUrl = "http://localhost:5000/" + link.short;
                      const type = link.type;

                      return (
                        <tr
                          key={link._id}
                          className="border-t border-gray-100 hover:bg-gray-50 transition-all duration-200"
                        >
                          <td className="px-6 py-4 max-w-xs truncate text-gray-700">
                            {link.full_url.startsWith("https")
                              ? link.full_url
                              : "https://www." + link.full_url}
                          </td>
                          <td className="px-6 py-4 text-blue-600 underline break-all">
                            <a href={finalUrl} target="_blank" rel="noreferrer">
                              {finalUrl}
                            </a>
                          </td>
                          <td className="px-6 py-4 capitalize text-gray-600">
                            {type}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleCopy(finalUrl, link._id)}
                                className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition min-w-[90px] justify-center"
                              >
                                <FiCopy className="text-blue-600" />
                                <span className="w-[60px] text-sm text-center">
                                  {copiedUrlId === link._id
                                    ? "Copied!"
                                    : "Copy"}
                                </span>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(link._id);
                                }}
                                className="group h-10 w-9 rounded-md flex justify-center items-center hover:bg-gray-100 transition"
                              >
                                <MdDeleteForever
                                  className="group-hover:text-red-500"
                                  size={20}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* 📱 COMPACT MOBILE CARD VIEW */}
              <div className="sm:hidden space-y-2">
                {userUrls.map((link) => {
                  const finalUrl = "http://localhost:5000/" + link.short;
                  const type = link.type;

                  return (
                    <div
                      key={link._id}
                      className="border border-gray-200 rounded-md px-3 py-2 shadow-sm bg-white flex flex-col gap-1"
                    >
                      {/* URL Info */}
                      <p className="text-[10px] text-gray-400">Original</p>
                      <p className="text-[12px] text-gray-800 font-medium truncate">
                        {link.full_url.startsWith("https")
                          ? link.full_url
                          : "https://www." + link.full_url}
                      </p>

                      <p className="text-[10px] text-gray-400 mt-1">Short</p>
                      <a
                        href={finalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 text-[12px] underline truncate"
                      >
                        {finalUrl}
                      </a>

                      {/* Type + Actions */}
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-[11px] capitalize text-gray-500">
                          {type}
                        </span>

                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCopy(finalUrl, link._id)}
                            className="text-[11px] text-gray-600 hover:text-blue-600 transition"
                          >
                            <FiCopy size={14} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(link._id);
                            }}
                            className="text-[11px] text-red-500 hover:text-red-600 transition"
                          >
                            <MdDeleteForever size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )
        ) :  (
          <div className="w-full relative h-32   ">
            <Lottie
            animationData={urlLoading}
            loop={true}
            className="md:w-40 w-36 mx-auto md:mx-0"
            autoplay={true}
          />
          </div>
        )}

          {/* ⚠️ No links available  */}
        </div>
      )}
    </>
  );
}

export default UrlForm;
