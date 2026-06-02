import styles from "./ImageCard.module.css";

import { useEffect, useState } from "react";
import { markdownToReadable } from "@/app/helpers/markdownToReadable";
import { getRedditTimeAgo } from "@/app/helpers/getRedditTimeAgo";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { textWithLink } from '@/app/helpers/textWithLink';

type ImageAttributes = {
  preview_url: string;
  post_url: string;
  subreddit: string;
  title: string;
  nsfw: boolean;
  description: string;
  date_created: number;
  onUnsave: (post_url: string) => Promise<void>;
}

const ImageCard: React.FC<ImageAttributes> = ({ preview_url, post_url, subreddit, title, nsfw, description, date_created, onUnsave }) => {
  const [unsaved, setUnsaved] = useState(false);
  const [copying, setCopying] = useState(false);
  const nsfw_blur = true;

  const handleShare = async () => {
    await navigator.clipboard.writeText(`https://reddit.com/${post_url}`);
    setCopying(true);
    setTimeout(() => setCopying(false), 1500);
  };

  const handleUnsave = async () => {
    setUnsaved(true);
    await onUnsave(post_url);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent>
        <a href={preview_url} target='_blank' className="block relative w-full aspect-[3/4]">
          <Image
            className={`object-cover ${nsfw_blur && nsfw ? "blur-md hover:blur-none transition duration-300" : ""}`}
            src={preview_url}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            alt={`Image for ${title}`}
          />
        </a>
      </CardContent>
      <CardHeader>
        <div className='post-details'>
          <a className='text-xs mb-1' href={`https://reddit.com/${post_url}`} target='_blank'>
            <span className="text-[#FF4500] font-medium">{`/${subreddit}`}</span>
            <span className="ml-2 text-gray-400">{getRedditTimeAgo(date_created)}</span>
          </a>
        </div>
        <CardTitle><a href={`https://reddit.com/${post_url}`} target='_blank'>{title}</a></CardTitle>
        <CardDescription className="line-clamp-4">
          {textWithLink(markdownToReadable(description))}
        </CardDescription>
      </CardHeader>
      <CardFooter className="border-t border-gray-100 pt-3 pb-3">
        <div className='buttons flex gap-2 w-full'>
          <button
            className={styles['button']}
            onClick={() => window.open(`https://reddit.com/${post_url}`, '_blank')}>
            Open
          </button>
          <button
            className={styles['button']}
            onClick={handleShare}>
            {copying ? 'Copied!' : 'Share'}
          </button>
          <button
            className={`${styles['button']} ${styles['button-unsave']}`}
            onClick={handleUnsave}
            disabled={unsaved}>
            {unsaved ? 'Unsaving...' : 'Unsave'}
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
