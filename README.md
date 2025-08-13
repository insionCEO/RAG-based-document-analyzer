
**Paperless-AI** is an AI-powered extension for [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) that brings automatic document classification, smart tagging, and semantic search using OpenAI-compatible APIs and Ollama.

It enables **fully automated document workflows**, **contextual chat**, and **powerful customization** — all via an intuitive web interface.

> 💡 Just ask:  
> “When did I sign my rental agreement?”  
> “What was the amount of the last electricity bill?”  
> “Which documents mention my health insurance?”  

Powered by **Retrieval-Augmented Generation (RAG)**, you can now search semantically across your full archive and get precise, natural language answers.

---

## ✨ Features

### 🔄 Automated Document Processing
- Detects new documents in Paperless-ngx automatically
- Analyzes content using OpenAI API, Ollama, and other compatible backends
- Assigns title, tags, document type, and correspondent
- Built-in support for:
  - Ollama (Mistral, Llama, Phi-3, Gemma-2)
  - OpenAI
  - DeepSeek.ai
  - OpenRouter.ai
  - Perplexity.ai
  - Together.ai
  - LiteLLM
  - VLLM
  - Fastchat
  - Gemini (Google)
  - ...and more!

### 🧠 RAG-Based AI Chat
- Natural language document search and Q&A
- Understands full document context (not just keywords)
- Semantic memory powered by your own data
- Fast, intelligent, privacy-friendly document queries  
![RAG_CHAT_DEMO](https://raw.githubusercontent.com/clusterzx/paperless-ai/refs/heads/main/ppairag.png)

### ⚙️ Manual Processing
- Web interface for manual AI tagging
- Useful when reviewing sensitive documents
- Accessible via `/manual`

### 🧩 Smart Tagging & Rules
- Define rules to limit which documents are processed
- Disable prompts and apply tags automatically
- Set custom output tags for tracked classification  
![PPAI_SHOWCASE3](https://github.com/user-attachments/assets/1fc9f470-6e45-43e0-a212-b8fa6225e8dd)

---

## 🚀 Installation

> ⚠️ **First-time install:** Restart the container **after completing setup** (API keys, preferences) to build RAG index.  
> 🔁 Not required for updates.

📘 [Installation Wiki](https://github.com/insionCEO/RAG-based-document-analyzer/wiki/2.-Installation)

---

## 🐳 Docker Support

- Health monitoring and auto-restart
- Persistent volumes and graceful shutdown
- Works out of the box with minimal setup

---

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start development/test mode
npm run test
```

---

## 🧭 Roadmap Highlights

- ✅ Multi-AI model support
- ✅ Multilingual document analysis
- ✅ Tag rules and filters
- ✅ Integrated document chat with RAG
- ✅ Responsive web interface

---

## 🤝 Contributing

We welcome PRs and contributions!

```bash
# Fork, clone, then:
git checkout -b feature/YourFeature
# After changes:
git commit -m "Add YourFeature"
git push origin feature/YourFeature
```

Then open a Pull Request via GitHub.

---

## 🆘 Support & Community

- [Issues](https://github.com/insionCEO/RAG-based-document-analyzer/issues)


---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---
**Telegram**: [@insionCEO](https://t.me/insionCEO)


