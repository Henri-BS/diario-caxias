import { useNotification, FieldError } from "components/shared/Notification";
import { TextInput, Textarea, Button, Label, Breadcrumb, Select } from "flowbite-react";
import { useFormik } from "formik";
import { FaCircleInfo, FaFolderClosed, FaHouse, FaTag, FaX } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "resources/auth";
import { ItemDetails, Project } from "resources/project";
import * as Yup from "yup";
import { Login } from "./UserForm";
import axios from "axios";
import { baseUrl } from "utils/requests";
import { useEffect, useState } from "react";
import { Props } from "resources";
import { CategoryPage } from "resources/category";

export const projectValidationSchema = Yup.object().shape({
    projectTitle: Yup.string()
        .trim()
        .required("O campo título é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!")
        .max(100, "O título deve ter no máximo 100 caracteres!"),
    projectDescription: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!"),
});

export function ProjectAddForm() {

    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const navigate = useNavigate();

    const { values, handleChange, errors, resetForm } = useFormik<Project>({
        initialValues: {
            projectTitle: "",
            projectDescription: "",
            projectImage: "",
            userId: 0
        },
        validationSchema: projectValidationSchema,
        onSubmit: onSubmit
    })


    async function onSubmit() {
        const project: Project = { projectTitle: values.projectTitle, projectDescription: values.projectDescription, projectImage: values.projectImage, userId: userId }
        try {
            axios.post(`${baseUrl}/projects/save`, project)
                .then((response) => {
                    navigate(`/projetos/${project.id}`)
                    return response.status;
                });
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
                <div className="mt-10">
                    <Breadcrumb aria-label="breadcrumb" className="mb-3 py-2">
                        <Breadcrumb.Item icon={FaHouse}>
                            <Link to="/">
                                Início
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/projetos">
                                Projetos
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item >
                            <Link to="/projetos/adicionar">
                                Adicionar Projeto
                            </Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>

                    <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                            <span className="flex flex-row items-center gap-2"><FaFolderClosed /> Adicionar Projeto </span>
                            <FaX onClick={() => navigate(-1)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300  text-2xl" />
                        </div>
                        <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                            <div>
                                <TextInput type="hidden"
                                    id="userId"
                                    onChange={handleChange}
                                    value={userId}
                                />
                            </div>
                            <div >
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                                <TextInput
                                    color="bg-zinc-400"
                                    id="projectTitle"
                                    onChange={handleChange}
                                    value={values.projectTitle}
                                />
                                <FieldError error={errors.projectTitle} />
                            </div>
                            <div>
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                                <Textarea
                                    color="bg-zinc-400"
                                    id="projectDescription"
                                    onChange={handleChange}
                                    value={values.projectDescription}
                                />
                                <FieldError error={errors.projectDescription} />
                            </div>
                            <div className="mt-5 grid grid-cols-1">
                                <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url da Imagem: " />
                                <TextInput
                                    color="bg-zinc-400"
                                    id="projectImage"
                                    onChange={handleChange}
                                    value={values.projectImage}
                                />
                            </div>
                            <div className="mt-5 flex items-center justify-end gap-x-4">
                                <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    );
}

export function ProjectEditForm({ params: projectId }: Props) {
    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const navigate = useNavigate();

    const [project, setProject] = useState<Project>();
    useEffect(() => {
        axios.get(`${baseUrl}/projects/${projectId}`)
            .then((response) => {
                setProject(response.data);
            });
    }, [projectId]);

    const { values, handleChange, errors } = useFormik<Project>({
        initialValues: {
            id: projectId,
            projectTitle: project?.projectTitle,
            projectDescription: project?.projectDescription,
            projectImage: project?.projectImage,
            userId: userId
        },
        validationSchema: projectValidationSchema,
        onSubmit: onSubmit
    })

    async function onSubmit() {
        const projectValues: Project = {
            id: projectId,
            projectTitle: values.projectTitle ?? project?.projectTitle,
            projectDescription: values.projectDescription ?? project?.projectDescription,
            projectImage: values.projectImage ?? project?.projectImage,
            userId: userId
        }
        try {
            axios.put(`${baseUrl}/projects/update`, projectValues)
                .then((response) => {
                    navigate(0);
                    return response.status;
                });
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }
    return (
        <div>
            {!auth.isSessionValid() ? <Login /> :
                <div className="flex flex-col items-center justify-center mt-10">
                    <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaFolderClosed /> Editar Projeto </span>
                        <FaX onClick={() => navigate(0)} className="hover:shadow-xl cursor-pointer rounded-full  p-1 border hover:bg-gray-300  text-2xl" />
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                        <div>
                            <TextInput
                                type="hidden"
                                id="userId"
                                onChange={handleChange}
                                value={userId}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Título: *" />
                            <TextInput
                                color="bg-zinc-400"
                                id="projectTitle"
                                onChange={handleChange}
                                value={values.projectTitle}
                            />
                            <FieldError error={errors.projectTitle} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Url de Imagem: " />
                            <TextInput
                                color="bg-zinc-400"
                                id="projectImage"
                                onChange={handleChange}
                                value={values.projectImage}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                            <Textarea
                                color="bg-zinc-400"
                                id="projectDescription"
                                onChange={handleChange}
                                value={values.projectDescription}
                            />
                            <FieldError error={errors.projectDescription} />
                        </div>

                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                        </div>
                    </form>
                </div>
            }
        </div>
    );
}

const itemValidationSchema = Yup.object().shape({
    itemType: Yup.string()
        .trim()
        .required("O tipo é obrigatório!"),
    itemDescription: Yup.string()
        .trim()
        .required("O campo de descrição é obrigatório!")
        .min(3, "O título deve ter no mínimo 3 caracteres!"),

});

export function ItemAddForm({ params: projectId }: Props) {

    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const navigate = useNavigate();

    const { values, handleChange, errors, resetForm } = useFormik<ItemDetails>({
        initialValues: {
            itemType: "",
            itemDescription: "",
            projectId: 0,
            userId: 0
        },
        validationSchema: itemValidationSchema,
        onSubmit: onSubmit
    })


    async function onSubmit() {
        const item: ItemDetails = { itemType: values.itemType, itemDescription: values.itemDescription, projectId: projectId, userId: userId }
        try {
            axios.post(`${baseUrl}/projects/save-item`, item)
                .then((response) => {
                    navigate(`/projetos/${item.projectId}`)
                    return response.status;
                });
            notification.notify("Salvo com sucesso!", "success");
            resetForm();
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }

    return (
        <>
            <div className="mt-10">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaCircleInfo /> Adicionar Item </span>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                        <div>
                            <TextInput type="hidden"
                                id="userId"
                                onChange={handleChange}
                                value={userId}
                            />
                            <TextInput type="hidden"
                                id="projectId"
                                onChange={handleChange}
                                value={userId}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Tipo: *" />
                            <Select
                                color="bg-zinc-400"
                                id="itemType"
                                onChange={handleChange}
                                value={values.itemType}
                            >
                                <option></option>
                                <option>Objetivos</option>
                                <option>Atividades</option>
                                <option>Etapas</option>
                                <option>Impacto</option>
                                <option>Desafios</option>
                                <option>Referências</option>
                                <option>Adicional</option>
                            </Select>
                            <FieldError error={errors.itemType} />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Descrição: *" />
                            <Textarea
                                className="h-[200px]"
                                color="bg-zinc-400"
                                id="itemDescription"
                                onChange={handleChange}
                                value={values.itemDescription}
                            />
                            <FieldError error={errors.itemDescription} />
                        </div>
                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export function ProjectCategoryAddForm({ params: projectId }: Props) {

    const notification = useNotification();
    const auth = useAuth();
    const userId = auth.getUserSession()?.id;
    const navigate = useNavigate();


    const query = "";
    const [categoryPage, setCategoryPage] = useState<CategoryPage>({ content: [], page: { number: 0, totalElements: 0 } });

    useEffect(() => {
        axios.get(`${baseUrl}/categories?query=${query}&size=20`)
            .then((response) => {
                setCategoryPage(response.data);
            })
    }, [query]);

    type ProjectCategory = {
        categoryName?: string;
        projectId?: number;
        userId?: number;
    }

    const { values, handleChange, resetForm } = useFormik<ProjectCategory>({
        initialValues: {
            categoryName: "",
            projectId: 0,
            userId: 0
        },
        validationSchema: itemValidationSchema,
        onSubmit: onSubmit
    })


    async function onSubmit() {
        const projectCategory: ProjectCategory = { categoryName: values.categoryName, projectId: projectId, userId: userId }

        try {
            axios.post(`${baseUrl}/project-category/save`, projectCategory)
                .then((response) => {
                    navigate(`/projetos/${projectCategory.projectId}`)
                    return response.status;
                });
            notification.notify("Salvo com sucesso!", "success");
            resetForm();
        } catch (error: any) {
            const message = error?.message;
            notification.notify(message, "error");
        }
    }

    return (
        <>
            <div className="mt-10">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row justify-between items-center text-xl font-semibold tracking-tight text-gray-700 mb-3 w-2/3">
                        <span className="flex flex-row items-center gap-2"><FaTag /> Adicionar Categoria </span>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-2 w-2/3">
                        <div>
                            <TextInput type="hidden"
                                id="userId"
                                onChange={handleChange}
                                value={userId}
                            />
                            <TextInput type="hidden"
                                id="projectId"
                                onChange={handleChange}
                                value={projectId}
                            />
                        </div>
                        <div>
                            <Label className="block text-sm font-medium leading-6 text-gray-700" value="Categoria: *" />
                            <TextInput
                                color="bg-zinc-400"
                                id="categoryName"
                                list="categoryList"
                                onChange={handleChange}
                                value={values.categoryName}
                            />
                            <datalist id="categoryList">
                                {categoryPage.content?.filter((category) =>
                                    category.categoryName?.toUpperCase().includes(query.toLocaleUpperCase()))
                                    .map((project) =>
                                        <>
                                            <option id="query" key={project.id} value={project.categoryName}>
                                                {project.categoryName}
                                            </option>
                                        </>
                                    )
                                }
                            </datalist>
                        </div>

                        <div className="mt-5 flex items-center justify-end gap-x-4">
                            <Button type="submit" gradientDuoTone="purpleToBlue" >Salvar</Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}