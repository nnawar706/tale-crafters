import { Id } from "@/convex/_generated/dataModel";
import { Dispatch, SetStateAction } from "react";

export interface StoryCardProps {
    id: string; // TODO: change it to convex type later 
    title: string;
    detail: string;
    imgUrl: string;
}

export interface GenerateStoryProps {
    setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
    audio: string;
    setAudio: Dispatch<SetStateAction<string>>;
    voiceType: string | null;
    voicePrompt: string;
    setVoicePrompt: Dispatch<SetStateAction<string>>;
    setAudioDuration: Dispatch<SetStateAction<number>>;
}