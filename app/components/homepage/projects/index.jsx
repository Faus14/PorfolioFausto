// @flow strict 
'use client';

import { projectsPost } from "@/utils/data/projectsPost"; 
import Image from "next/image"; 
import Link from "next/link";
import { FaCode, FaDumbbell, FaTwitter, FaPlane, FaStore } from "react-icons/fa"; 
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useEffect, useState } from "react";  
import dynamic from 'next/dynamic';

// Importación dinámica
const GlowCard = dynamic(() => import("../../helper/glow-card"), { 
  ssr: false 
});


function Blog() {   
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Obtener el icono según el ID del proyecto
  const getProjectIcon = (id) => {
    switch(id) {
      case 1: return <FaCode size={24} />;
      case 2: return <FaDumbbell size={24} />;
      case 3: return <FaTwitter size={24} />;
      case 4: return <FaPlane size={24} />;
      case 5: return <FaStore size={24} />;
      case 6: return <FaCode size={24} />;
      default: return <FaCode size={24} />;
    }
  };

  if (!isClient) {
    return (
      <div id="blog" className="relative z-50 border-t my-8 lg:my-16 border-[#25213b]">
        <div className="container mx-auto py-6 px-4">
          <div className="flex justify-center my-4 lg:py-6">
            <div className="flex items-center">
              <span className="w-24 h-[2px] bg-[#1a1443]"></span>
              <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
                Projects
              </span>
              <span className="w-24 h-[2px] bg-[#1a1443]"></span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-[#1a1443]/50 rounded-lg h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (     
    <div id="blog" className="relative z-50 border-t my-8 lg:my-16 border-[#25213b]">       
      <Image         
        src="/section.svg"         
        alt="Hero"         
        width={1572}         
        height={795}         
        className="absolute top-0 -z-10"       
      />       
      <div className="flex justify-center -translate-y-[1px]">         
        <div className="w-3/4">           
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />         
        </div>       
      </div>        
      
      <div className="flex justify-center my-4 lg:py-6">         
        <div className="flex items-center">           
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>           
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">             
            Projects           
          </span>           
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>         
        </div>       
      </div>        
      
      <div className="container mx-auto py-6 px-4">         
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projectsPost.map(post => (
            <GlowCard key={post.id} identifier={`blog-${post.id}`}>
              <div className="p-2 relative text-white h-full flex flex-col">
                <Image
                  src="/blur-23.svg"
                  alt="Hero"
                  width={1080}
                  height={200}
                  className="absolute bottom-0 opacity-80"
                />
                <div className="flex justify-center">
                  <p className="text-xs text-[#16f2b3]">
                    {post.date}
                  </p>
                </div>
                
                <div className="relative w-full h-32 mb-3 mt-2 overflow-hidden rounded-lg bg-gradient-to-br from-violet-900/50 to-pink-900/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white opacity-80 transform scale-125">
                      {getProjectIcon(post.id)}
                    </div>
                  </div>
                </div>
                
                <div className="px-2 py-2 flex flex-col flex-grow">
                  <div className="flex items-center gap-x-3 mb-2">
                    <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                      {getProjectIcon(post.id)}
                    </div>
                    <p className="text-base font-medium">
                      {post.title}
                    </p>
                  </div>
                  
                  <div className="h-16 overflow-y-auto mb-3">
                    <p className="text-xs text-gray-300">{post.excerpt}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {post.technologies && post.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-1.5 py-0.5 bg-violet-900/50 rounded-md text-violet-200 border border-violet-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => {
                        console.log(post.urlGithub); // Verifica si el enlace se imprime correctamente
                        if (post.urlGithub) {
                          window.open(post.urlGithub, '_blank');
                        }
                      }}
                      className="text-xs bg-violet-600 hover:bg-violet-700 transition-colors py-1 px-2 rounded-md inline-flex items-center relative z-20"
                    >
                      <FiGithub className="mr-1" size={12} /> Code
                    </button>

                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>     
    </div>   
  ); 
};  

export default Blog;
