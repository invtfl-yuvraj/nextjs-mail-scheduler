import { useState, useEffect } from "react";

import {
  Pencil,
  Save,
  Instagram,
  Facebook,
  Link2,
  Wand2,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

const MAX_SUBJECT_LENGTH = 35;
const MAX_BODY_LENGTH = 100;

const MailTemplateEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/templates");
        const data = await res.json();
        setTemplates(data);
      } catch (err) {
        setError("Failed to load templates");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Validate input lengths
  const validateInput = () => {
    if (subject.length > MAX_SUBJECT_LENGTH) {
      setError(`Subject must be ${MAX_SUBJECT_LENGTH} characters or less`);
      return false;
    }
    if (body.length > MAX_BODY_LENGTH) {
      setError(`Body must be ${MAX_BODY_LENGTH} characters or less`);
      return false;
    }
    setError(null);
    return true;
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setSubject(template.subject);
    setBody(template.body);
    setIsEditing(false);
    setError(null);
    setIsDropdownOpen(false);
  };

  const handleSaveChanges = async () => {
    if (!validateInput()) return;

    try {
      const updatedData = {
        subject,
        body,
      };

      const res = await fetch(`/api/templates/${selectedTemplate.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error("Failed to save changes");
      }

      const updatedTemplate = await res.json(); // Get the updated template

      console.log("Updated template:", updatedTemplate);


      setSelectedTemplate(updatedTemplate.updatedTemplate); 

      setIsEditing(false); // Stop editing mode
    } catch (err) {
      setError("Failed to save changes");
      console.error(err);
    }
  };

  const getSubjectLengthColor = () => {
    const ratio = subject.length / MAX_SUBJECT_LENGTH;
    if (ratio > 1) return "text-red-500";
    if (ratio > 0.8) return "text-yellow-500";
    return "text-gray-400";
  };

  const getBodyLengthColor = () => {
    const ratio = body.length / MAX_BODY_LENGTH;
    if (ratio > 1) return "text-red-500";
    if (ratio > 0.8) return "text-yellow-500";
    return "text-gray-400";
  };

  return (
    <div className="max-w-xl w-1/2 h-[95vh] mx-auto flex flex-col justify-between bg-white rounded-lg shadow">
      {/* Template Header */}
      <div className="p-6 border-b bg-gray-100">
        <div className="flex items-center justify-between  mb-4">
          <h2 className="text-xl font-bold text-gray-500 inline-block p-2">
            Mail Template
          </h2>
          {selectedTemplate && (
            <button
              onClick={() =>
                isEditing ? handleSaveChanges() : setIsEditing(true)
              }
              className="flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black  hover:bg-yellow-500 rounded-md transition-colors"
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" />
                  Save
                </>
              ) : (
                <>
                  <Pencil className="w-4 h-4" />
                  Edit
                </>
              )}
            </button>
          )}
        </div>

        {/* Template Dropdown Selection */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-full p-3 border rounded-lg flex items-center justify-between bg-white hover:bg-gray-50 transition-colors"
          >
            <span className="text-gray-700">
              {selectedTemplate ? selectedTemplate.name : "Select a template"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg">
              {templates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <img
                    src={template.preview}
                    alt={template.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <span className="font-medium">{template.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {!selectedTemplate && (
        <div className="w-full h-full flex flex-col items-center justify-center ">
          <div className="p-4 bg-purple-200 rounded-lg">
            <h2 className="text-xl font-bold">No Template Selected</h2>
            <p className="">You can select desired mail template above</p>
          </div>
        </div>
      )}

      {/* Template Preview */}
      {selectedTemplate && (
        <div className="p-6 w-full h-full flex flex-col justify-between overflow-scroll no-scrollbar">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="mb-8 max-h-64 overflow-scroll bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/15735/15735344.png"
                  alt="Logo"
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">My Company</span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded transition-colors">
                  <Instagram className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-500 hover:bg-gray-100 rounded transition-colors">
                  <Link2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="bg-zinc-200 rounded-lg p-6 mb-4 shadow-sm">
              <h1 className="text-2xl font-bold mb-4">
                {subject || "Email Subject"}
              </h1>
              <p className="text-gray-600 mb-6">
                {body || "Email body content will appear here"}
              </p>
              <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
                {selectedTemplate.btnText}
              </button>
            </div>

            <div className="relative">
              <img
                src={selectedTemplate.promo}
                alt="Promotion"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="inset-0 bg-black bg-opacity-40 flex items-center px-6">
              <p className="text-white">Text promotion here</p>
            </div>
          </div>

          {/* Subject Line */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Subject Mail</label>
            <div className="relative">
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={!isEditing}
                className={`w-full p-4 border rounded-lg pr-16 transition-colors ${
                  subject.length > MAX_SUBJECT_LENGTH ? "border-red-300" : ""
                }`}
                placeholder="Enter email subject"
              />
              <span
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${getSubjectLengthColor()}`}
              >
                {subject.length}/{MAX_SUBJECT_LENGTH}
              </span>
            </div>
          </div>

          {/* Body Content */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-gray-700">Body Mail</label>
            </div>
            <div className="relative">
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                disabled={!isEditing}
                className={`w-full p-4 border rounded-lg pr-16 min-h-[100px] resize-none transition-colors ${
                  body.length > MAX_BODY_LENGTH ? "border-red-300" : ""
                }`}
                placeholder="Enter email body"
              />
              <span
                className={`absolute right-4 bottom-4 ${getBodyLengthColor()}`}
              >
                {body.length}/{MAX_BODY_LENGTH}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleSaveChanges}
            disabled={!isEditing}
            className="w-full py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default MailTemplateEditor;
