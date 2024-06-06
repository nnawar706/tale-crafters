"use client"

import GenerateStory from '@/components/GenerateStory'
import GenerateThumbnail from '@/components/GenerateThumbnail'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { voices } from '@/constants'
import { Id } from '@/convex/_generated/dataModel'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  title:  z.string().min(2),
  detail: z.string().min(2),
})

const Create = () => {
  const [selectedVoice, setSelectedVoice]   = useState<string | null>(null)
  const [voicePrompt, setVoicePrompt]       = useState<string>('')

  const [imagePrompt, setImagePrompt]       = useState<string>('')
  const [imageUrl, setImageUrl]             = useState<string>('')
  const [imageStorageId, setImageStorageId] = useState<Id<'_storage'> | null>(null)
  
  const [audioUrl, setAudioUrl]             = useState<string>('')
  const [audioStorageId, setAudioStorageId] = useState<Id<'_storage'> | null>(null)
  const [audioDuration, setAudioDuration]   = useState<number>(0)
  
  const [submitting, setSubmitting]         = useState<boolean>(false)
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      detail: '',
    }
  })

  const handleFormSubmit = () => {}

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Story</h1>

      <Form { ...form }>
        <form onSubmit={form.handleSubmit(handleFormSubmit)}
        className="mt-12 flex w-full flex-col">
          <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-16 font-bold text-white-1">Title</FormLabel>
                  <FormControl>
                    <Input className="input-class focus-visible:ring-offset-orange-1" 
                    placeholder="Give your tale a title" {...field}/>
                  </FormControl>
                  {/* <FormMessage className="text-white-1"/> */}
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              <p className="text-white-1 text-14 font-bold">
                Select Your Voice
              </p>

              <Select onValueChange={(value) => setSelectedVoice(value)}>
                <SelectTrigger className="text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1">
                  <SelectValue placeholder="Select Your Prefered Voice" className="placeholder:text-gray-1"/>
                </SelectTrigger>
                <SelectContent className="bg-black-1 border-none text-16 font-normal focus:ring-orange-1">
                  {voices.map((item) => (
                    <SelectItem key={item.id} value={item.name} className="capitalize focus:bg-orange-1 text-white-1 focus:text-white-1">
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
                {selectedVoice && (
                  <audio src={`/voices/${selectedVoice}.mp3`} autoPlay className="hidden"/>
                )}
              </Select>
            </div>
            
            <FormField 
              control={form.control}
              name="detail"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel className="text-16 font-bold text-white-1">Script</FormLabel>
                  <FormControl>
                    <Textarea className="input-class focus-visible:ring-offset-orange-1" placeholder="Write Your Tale" {...field} />
                  </FormControl>
                  {/* <FormMessage className="text-white-1"/> */}
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col pt-10">
            
            <div className="flex flex-col pt-10">
              <GenerateStory
                setAudioStorageId={setAudioStorageId}
                audio={audioUrl}
                setAudio={setAudioUrl}
                voiceType={selectedVoice}
                voicePrompt={voicePrompt}
                setVoicePrompt={setVoicePrompt}
                setAudioDuration={setAudioDuration}
              />

              <GenerateThumbnail/>

              <div className="mt-10 w-full">
                <Button type="submit" className="text-16 w-full rounded-[10px] bg-orange-1 py-4 font-bold text-white-1 transition-all duration-500 hover:bg-black-1">
                  {
                    submitting ? (
                      <>
                        <Loader size={20} className="animate-spin mr-2"/> Submiting...
                      </>
                    ) : (
                      'Submit & Publish'
                    )
                  }
                </Button>
              </div>  
            </div>
          </div>
        </form>
      </Form>
    </section>
  )
}

export default Create