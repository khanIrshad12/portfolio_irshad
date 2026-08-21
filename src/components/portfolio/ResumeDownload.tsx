import type { ReactNode } from "react";

interface ResumeDownloadProps {
  className?: string;
  children?: ReactNode;
}

/** Triggers a file download via the resume download API */
export function ResumeDownload({
  className = "",
  children = "Download Resume",
}: ResumeDownloadProps) {
  return (
    <a href="/api/resume/download" download className={className}>
      {children}
    </a>
  );
}
