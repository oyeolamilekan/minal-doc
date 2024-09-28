/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomSupense } from '@/components/ui/custom-suspense';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { TextArea } from '@/components/ui/textarea';
import { apiProjects, createProject } from '@/endpoints/api-projects';
import { useModals } from '@/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ArrowRight, BoxIcon, Plus } from 'lucide-react';
import React from 'react'
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation'

interface Project {
  id: number
  title: string
  slug: string
  description: string
}

export default function Projects() {

  const router = useRouter()

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  const { isLoading, isError, data } = useQuery({
    queryKey: ["projects"],
    queryFn: () => apiProjects(),
    retry: false,
  });

  const { modals, updateModals } = useModals();

  const toggleAddProjectModal = () => updateModals({ addProjectModal: !modals.addProjectModal })

  const onSubmit = async (data: FieldValues) => {
    const { title, description } = data
    mutate({ title, description });
  };

  const { isPending, mutate } = useMutation({
    mutationFn: createProject,
    onSuccess() {
      toggleAddProjectModal();
      reset()
    },
    onError(err: any) {
      const { message } = err.response?.data || '';
      toast.error(message);
    },
  })


  return (
    <div>
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-gray-800">Minal Doc</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Projects
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Team
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Settings
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2" onClick={toggleAddProjectModal}>
                <Plus className="h-5 w-5 mr-2" />
                Add Project
              </Button>
            </div>
          </div>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-12">
        <CustomSupense
          isLoading={isLoading}
          isError={isError}
          isEmpty={data?.data?.length <= 0}
          fallBackEmpty={
            <div className="flex items-center justify-center md:h-4/6 h-3/6 w-full">
              <div className="flex flex-col items-center justify-center">
                <div className="p-5 rounded-full dark:bg-neutral-600 bg-secondary">
                  <BoxIcon />
                </div>
                <p className="my-4 font-medium dark:text-white text-xl">No projects available.</p>
              </div>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data?.data?.map((project: Project) => (
              <Card key={project.id} className="overflow-hidden border border-gray-200 transition-colors duration-300 hover:border-gray-300 rounded">
                <CardHeader className="p-6">
                  <CardTitle className="text-xl font-semibold text-gray-800">{project.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-4">
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0">
                  <Button
                    variant="ghost"
                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-4 py-2 -ml-4 rounded-md transition-colors duration-300"
                    onClick={() => router.push(`features/${project.slug}`)}
                  >
                    View Project <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CustomSupense>
        <Modal isShown={modals.addProjectModal} onClose={toggleAddProjectModal} title='Add Project'>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeHolder="Title"
              type="text"
              name="title"
              register={register}
              errors={errors}
              validationSchema={{
                required: "Title is required",
              }}
            />
            <TextArea
              placeHolder="Description"
              name="description"
              register={register}
              errors={errors}
              validationSchema={{
                required: "Description is required",
              }}
            />
            <Button className='w-full' loading={isPending} disabled={isPending}>
              Add Project
            </Button>
          </Form>
        </Modal>
      </div>
    </div>
  )
}
