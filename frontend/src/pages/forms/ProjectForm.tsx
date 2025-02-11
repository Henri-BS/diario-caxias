import { useNotification, FieldError } from "components/shared/Notification";
import { TextInput, Textarea, Button } from "flowbite-react";
import { useFormik } from "formik";
import { FaFolderClosed } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "resources/auth";
import { useProjectService, Project } from "resources/project";
import * as Yup from "yup";
import { Login } from "./UserForm";

export interface ProjectFormProps {
    title: string;
    description: string;
    image: string;
    userId: number;
}

export const projectFormSchema: ProjectFormProps = {
    title: "",
    description: "",
    image: "",
    userId: 0,
};

export const projectValidationSchema = Yup.object().shape({
    title: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(100, "O título deve ter no máximo 100 caracteres!"),
    description: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!"),
});

export function ProjectAddForm() {

    const notification = useNotification();
    const service = useProjectService();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;


    const { values, handleChange, handleSubmit, errors, resetForm } = useFormik<ProjectFormProps>({
        initialValues: projectFormSchema,
        validationSchema: projectValidationSchema,
        onSubmit: onSubmit
    })


    async function onSubmit(values: ProjectFormProps) {
        const project: Project = { projectTitle: values.title, projectDescription: values.description, projectImage: values.image, userId: userId }
        try {
            await service.saveProject(project);
            notification.notify("Salvo com sucesso!", "success");
            resetForm();
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }

    return (
        <>
            {!auth.isSessionValid() ? <Login /> :
                <div className="flex flex-col items-center justify-center my-5">
                    <span className="flex gap-2 mt-3 mb-10 text-2xl font-bold tracking-tight text-gray-900">
                        Adicionar Novo Projeto <FaFolderClosed />
                    </span>
                    <form onSubmit={handleSubmit} className="space-y-2 w-2/3">
                        <div className="grid grid-cols-1">
                            <TextInput type="hidden"
                                id="userId"
                                onChange={handleChange}
                                value={userId}
                            />
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Título: *</label>
                            <TextInput
                                color="bg-zinc-400"
                                id="title"
                                onChange={handleChange}
                                value={values.title}
                                placeholder="título do projeto" />
                            <FieldError error={errors.title} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className='block text-sm font-medium leading-6 text-gray-700'>Descrição: </label>
                            <Textarea
                                color="bg-zinc-400"
                                id="description"
                                onChange={handleChange}
                                value={values.description}
                                placeholder="descrição sobre o projeto" />
                            <FieldError error={errors.description} />
                        </div>
                        <div className="mt-5 grid grid-cols-1">
                            <label className="block text-sm font-medium leading-6 text-gray-700">Url de Imagem: </label>
                            <TextInput
                                color="bg-zinc-400"
                                id="image"
                                onChange={handleChange}
                                value={values.image}
                                placeholder="http://example-web.com/image.png" />
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                            <Link to="/projetos">
                                <Button type="button" color="failure" >Cancelar</Button>
                            </Link>
                        </div>
                    </form>
                </div>
            }
        </>
    );
}