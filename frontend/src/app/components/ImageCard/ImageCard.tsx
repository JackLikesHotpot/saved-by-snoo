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
}

const ImageCard: React.FC<ImageAttributes> = ({preview_url, post_url, subreddit, title, nsfw, description, date_created}) => {

  const nsfw_blur = true;
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
          <a className='text-xs mb-1' href={`https://reddit.com/${post_url}`} target='_blank'>{`/${subreddit}`}{`       ${getRedditTimeAgo(date_created)}`}</a>
        </div>
        <CardTitle><a href={`https://reddit.com/${post_url}`} target='_blank'>{title}</a></CardTitle>
      </CardHeader>
        <CardDescription className="line-clamp-6">{textWithLink(markdownToReadable(description))}
        </CardDescription>
      <CardFooter className="border-t border-gray-200 my-4">
        <div className='buttons flex gap-4 justify-between w-3/4 mx-8 pt-4'>
          <div className={styles['button']}>Open</div>
          <div className={styles['button']}>Share</div>
          <div className={styles['button']}>Unsave</div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
