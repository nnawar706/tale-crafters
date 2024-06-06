import { GenerateStoryProps } from '@/types'
import React, { useState } from 'react'
import { useToast } from './ui/use-toast'
import { Textarea } from './ui/textarea'

const GenerateStory = ({ 
    setAudioStorageId, 
    audio, 
    setAudio, 
    voiceType, 
    voicePrompt, 
    setVoicePrompt, 
    setAudioDuration }: GenerateStoryProps) => {
        const [generating, isGenerating] = useState(false)
        const { toast } = useToast()
    return (
        <>
            <div className="flex flex-col gap-2">
                <p className="text-14 font-bold text-white-1">Generate Storyline</p>
                <Textarea
                    className="input-class font-light focus-visible:ring-offset-orange-1"
                    placeholder="Provide Text to Generate Audio"
                    rows={5}
                />
            </div>
        </>
    )
}

export default GenerateStory
