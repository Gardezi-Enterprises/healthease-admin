import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Type,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';


interface AdvancedTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  rows?: number;
}

export function AdvancedTextEditor({
  value,
  onChange,
  label,
  placeholder = "Enter content here...",
  rows = 8
}: AdvancedTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  const textSizes = [
    { label: 'Small', value: '14px', size: 'text-sm' },
    { label: 'Normal', value: '16px', size: 'text-base' },
    { label: 'Large', value: '18px', size: 'text-lg' },
    { label: 'Extra Large', value: '20px', size: 'text-xl' },
    { label: 'Heading 3', value: '24px', size: 'text-2xl' },
    { label: 'Heading 2', value: '28px', size: 'text-3xl' },
    { label: 'Heading 1', value: '32px', size: 'text-4xl' }
  ];



  const alignments = [
    { label: 'Left', value: 'left', icon: AlignLeft },
    { label: 'Center', value: 'center', icon: AlignCenter },
    { label: 'Right', value: 'right', icon: AlignRight },
    { label: 'Justify', value: 'justify', icon: AlignJustify }
  ];

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus();
      document.execCommand(command, false, value);
      handleInput();
    }
  };

  const applyTextSize = (size: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      
      // Check if we have selected text
      if (!range.collapsed) {
        // Apply font size to selected text
        const span = document.createElement('span');
        span.style.fontSize = size;
        span.style.fontWeight = size.includes('24px') || size.includes('28px') || size.includes('32px') ? 'bold' : 'normal';
        range.surroundContents(span);
      } else {
        // Insert a heading or paragraph marker at cursor position
        const sizeMap: { [key: string]: string } = {
          '14px': '<span style="font-size: 14px;">',
          '16px': '<span style="font-size: 16px;">',
          '18px': '<span style="font-size: 18px;">',
          '20px': '<span style="font-size: 20px;">',
          '24px': '<h3 style="font-size: 24px; font-weight: bold; margin: 0.5rem 0;">',
          '28px': '<h2 style="font-size: 28px; font-weight: bold; margin: 0.75rem 0;">',
          '32px': '<h1 style="font-size: 32px; font-weight: bold; margin: 1rem 0;">'
        };
        
        const tag = sizeMap[size] || '<span style="font-size: 16px;">';
        const closingTag = tag.includes('h1') ? '</h1>' : tag.includes('h2') ? '</h2>' : tag.includes('h3') ? '</h3>' : '</span>';
        
        // Insert the opening tag
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = tag + 'Text' + closingTag;
        const fragment = document.createRange().createContextualFragment(tempDiv.innerHTML);
        range.insertNode(fragment);
        
        // Position cursor after the inserted text
        range.setStartAfter(fragment);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      
      handleInput();
    }
  };



  const applyAlignment = (align: string) => {
    switch (align) {
      case 'left':
        execCommand('justifyLeft');
        break;
      case 'center':
        execCommand('justifyCenter');
        break;
      case 'right':
        execCommand('justifyRight');
        break;
      case 'justify':
        execCommand('justifyFull');
        break;
    }
  };

  const ToolbarButton = ({
    onClick,
    icon: Icon,
    title,
    children
  }: {
    onClick: () => void;
    icon?: React.ComponentType<{ className?: string }>;
    title: string;
    children?: React.ReactNode;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={onClick}
      title={title}
      className="h-9 w-9 p-0 hover:bg-accent"
    >
      {Icon ? <Icon className="h-4 w-4" /> : children}
    </Button>
  );

  const DropdownButton = ({
    trigger,
    items,
    onSelect
  }: {
    trigger: React.ReactNode;
    items: Array<{ label: string; value: string; icon?: React.ComponentType<{ className?: string }> }>;
    onSelect: (value: string) => void;
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 px-2">
          {trigger}
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-32">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={() => onSelect(item.value)}
          >
            {item.icon && <item.icon className="h-4 w-4 mr-2" />}
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="space-y-3">
      {label && <Label>{label}</Label>}

      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-3 border border-input rounded-t-md bg-muted/30">
        {/* Text Style Controls */}
        <div className="flex gap-1">
          <ToolbarButton
            onClick={() => execCommand('bold')}
            icon={Bold}
            title="Bold"
          />
          <ToolbarButton
            onClick={() => execCommand('italic')}
            icon={Italic}
            title="Italic"
          />
          <ToolbarButton
            onClick={() => execCommand('underline')}
            icon={Underline}
            title="Underline"
          />
        </div>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Text Size */}
        <DropdownButton
          trigger={
            <div className="flex items-center">
              <Type className="h-4 w-4" />
              <span className="ml-1 text-xs">Size</span>
            </div>
          }
          items={textSizes}
          onSelect={applyTextSize}
        />



        {/* Text Alignment */}
        <div className="flex gap-1">
          {alignments.map((align) => (
            <ToolbarButton
              key={align.value}
              onClick={() => applyAlignment(align.value)}
              icon={align.icon}
              title={`Align ${align.label}`}
            />
          ))}
        </div>
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          min-h-[${rows * 1.5}rem] p-4 border border-input rounded-b-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
          ${isFocused ? 'ring-2 ring-ring border-transparent' : ''}
        `}
        style={{
          minHeight: `${rows * 1.5}rem`,
          lineHeight: '1.6',
          fontSize: '16px',
          direction: 'ltr',
          textAlign: 'left',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word'
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />

      {/* Placeholder styling */}
      <style dangerouslySetInnerHTML={{
        __html: `
          [contenteditable]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            pointer-events: none;
          }
        `
      }} />
    </div>
  );
} 