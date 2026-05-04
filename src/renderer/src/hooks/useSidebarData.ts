import {useAuth} from "@/hooks/useAuth";
import {useMyCourses} from "@/hooks/useMyCourses";
import {IconDatabase} from "@tabler/icons-react";
import {useGetUserDetails} from "@/hooks/useGetUserDetails";
import {useUserStore} from "@/store";
import {useGetCoursesCreated} from "@/hooks/useGetCoursesCreated";

export function useSidebarData() {
  const {user} = useAuth();
  const userDetail = useUserStore(state => state.user)
  const{ data: courses, isLoading : coursesLoading} : {data: any, isLoading: boolean} = useMyCourses(user?.id);

  const navWorkspaces = (courses || []).map((course: { courseName: any; courseId: any; }) => ({

    name: course.courseName,
    url: `/workspaces/${course.courseId}`,
    icon: IconDatabase,
  }));

  const navUser = {
    name: (userDetail as any)?.fullName,
    email: (userDetail as any)?.email,
    avatar: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kLWljb24gbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTcuOTI1IDIwLjA1NmE2IDYgMCAwIDAtMTEuODUxLjAwMSIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTEiIHI9IjQiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjwvc3ZnPg==",
  }

  const{ data: coursesCreated, isLoading : coursesCreatedLoading} : {data: any, isLoading: boolean} = useGetCoursesCreated(user?.id);

  const navWorkspacesCreated = (coursesCreated || []).map((course: { name: any; id: any; }) => ({

    name: course.name,
    url: `/workspaces/${course.id}`,
    icon: IconDatabase,
  }));

  return{navWorkspaces, navWorkspacesCreated, navUser, isLoading: coursesLoading || coursesCreatedLoading};
}