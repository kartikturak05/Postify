// src/components/Footer.tsx
import { Github, Linkedin, Twitter, Globe, BookOpen } from "lucide-react";
import useAuthStore from "../Store/authStore";

const Footer = () => {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return null;

  const socials = [
    { icon: <Github size={22} />, link: "https://github.com/kartikturak05" },
    { icon: <Linkedin size={22} />, link: "https://www.linkedin.com/in/kartik-turak/" },
    { icon: <Twitter size={22} />, link: "https://x.com/KartikTurak05" },
    { icon: <Globe size={22} />, link: "https://portfolio-kartik-turaks-projects.vercel.app/" },
    { icon: <BookOpen size={22} />, link: "/blogs" },
  ];

  return (
    <footer className="w-full border-t border-gray-00 bg-gray-400 mt-12">
      <div className="max-w-6xl mx-auto px-3 py-3">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Left side - name */}
          <div className="text-center md:text-left">
            <h3 className="text-4xl font-semibold text-gray-800 mb-1">
              Kartik Turak
            </h3>
            <p className="text-gray-500 text-xl">
              Made with ❤️ 
            </p>
          </div>

          {/* Right side - socials */}
          <div className="flex gap-3">
            {socials.map((social, idx) => (
              <a
                key={idx}
                href={social.link}
                target={social.link.startsWith('http') ? "_blank" : undefined}
                rel={social.link.startsWith('http') ? "noopener noreferrer" : undefined}
                className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-800 transition-all duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom line */}
        <div className="border-t border-gray-100 mt-6 pt-4 text-center">
          <p className="text-md text-black">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;