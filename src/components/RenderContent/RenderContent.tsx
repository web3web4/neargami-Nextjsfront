"use client";
import React, { useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";


const SH: any = SyntaxHighlighter;
type Block =
  | { type: "code"; code: string; language: string }
  | { type: "html"; html: string };


const parseHTMLWithCodeBlocks = (html: string): Block[] => {
  const container = document.createElement("div");
  container.innerHTML = html;

  const result: Block[] = [];

  const nodes = Array.from(container.childNodes);

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];

    if (
      node.nodeType === Node.ELEMENT_NODE &&
      (node as HTMLElement).classList.contains("ql-code-block-container")
    ) {
      const blockLines: string[] = [];
      let language = "javascript";

      const innerBlocks = (node as HTMLElement).querySelectorAll(".ql-code-block");

      innerBlocks.forEach((el) => {
        const line = el.textContent || "";
        const langAttr = el.getAttribute("data-language");
        if (langAttr && langAttr !== "plain") {
          language = langAttr;
        }
        blockLines.push(line);
      });

      const code = blockLines.join("\n").trim();

      result.push({ type: "code", code, language });
    } else {
      result.push({
        type: "html",
        html: (node as HTMLElement).outerHTML || "",
      });
    }
  }

  return result;
};


// code formatter function
const simpleFormatCode = (code: string): string => {
  try {
    // Split the code into lines
    const lines = code.split('\n');
    
    // Track indentation level
    let indentLevel = 0;
    const indentSize = 2;
    const formattedLines = [];
    
    for (const line of lines) {
      // Trim whitespace from the line
      const trimmedLine = line.trim();
      
      // Skip empty lines
      if (!trimmedLine) {
        formattedLines.push('');
        continue;
      }
      
      // Check for closing brackets/braces that should decrease indent
      if (trimmedLine.startsWith('}') || trimmedLine.startsWith(')') || trimmedLine.startsWith(']')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      
      // Add the line with proper indentation
      const indent = ' '.repeat(indentLevel * indentSize);
      formattedLines.push(indent + trimmedLine);
      
      // Check for opening brackets/braces that should increase indent
      if (trimmedLine.endsWith('{') || trimmedLine.endsWith('(') || trimmedLine.endsWith('[')) {
        indentLevel++;
      }
      
      // Handle single-line blocks
      if (trimmedLine.includes('{') && trimmedLine.includes('}')) {
        // Don't change indent level for single-line blocks
      }
    }
    
    return formattedLines.join('\n');
  } catch (error) {
    console.error("Error formatting code:", error);
    return code; // Return original code if formatting fails
  }
};

const RenderContent = ({ htmlContent,className = "", }: { htmlContent: string,className?: string; }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const parsed = parseHTMLWithCodeBlocks(htmlContent);
    setBlocks(parsed);
  }, [htmlContent]);

  return (
    <div className={`prose max-w-none ${className}`}>
      {blocks.map((block, index) =>
        block.type === "html" ? (
          <div
            key={index}
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        ) : (
          <div key={index} className="relative mb-4 rounded-md overflow-hidden">
            <SH language={block.language} style={oneDark} wrapLongLines showLineNumbers>
              {simpleFormatCode(block.code)}
            </SH>
          </div>
        )
      )}
    </div>
  );
};

export default RenderContent;