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

type ImageAttributes = {
  url: string;
  subreddit: string;
  title: string;
  nsfw: boolean;
  description: string;
  author: string;
}

const ImageCard: React.FC<ImageAttributes> = ({url, subreddit, title, nsfw, description, author}) => {

  const nsfw_blur = true;
  return (
    <Card className="break-inside-avoid overflow-hidden mb-2">
      <CardHeader>
        <p className='text-xs'>{`r/${subreddit}`}</p>
        <p className='text-xs'>{`${author}`}</p>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{markdownToReadable(description)}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          className={
            nsfw_blur && nsfw
              ? "filter blur-md hover:blur-none transition duration-300 object-contain"
              : "drop-shadow-lg object-contain"
          }
          src={url}
          width={365}
          height={0}
          style={{height: 'auto'}}
          alt={`Image for ${title}`}
        />
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
