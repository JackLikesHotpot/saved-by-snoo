import styles from "./ImageCard.module.css";

import { useEffect, useState } from "react";
import { markdownToReadable } from "@/app/helpers/markdownToReadable";
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
}

const ImageCard: React.FC<ImageAttributes> = ({preview_url, post_url, subreddit, title, nsfw, description}) => {

  const nsfw_blur = true;
  return (
    <Card className="break-inside-avoid overflow-hidden mb-2">
      <CardHeader>
        <a className='text-xs mb-1' href={`https://reddit.com/${post_url}`} target='_blank'>{`/${subreddit}`}</a>
        <CardTitle><a href={`https://reddit.com/${post_url}`} target='_blank'>{title}</a></CardTitle>
        <CardDescription>{textWithLink(markdownToReadable(description))}</CardDescription>
      </CardHeader>
      <CardContent>
      <a href={preview_url} target='_blank'>
        <Image
          className={
            nsfw_blur && nsfw
              ? "filter blur-md hover:blur-none transition duration-300 object-contain"
              : "drop-shadow-lg object-contain"
          }
          src={preview_url}
          width={365}
          height={0}
          style={{height: 'auto'}}
          alt={`Image for ${title}`}>
        </Image>
        </a>
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
};

export default ImageCard;
