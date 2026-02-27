import {useAuth} from "@/hooks/useAuth";
import {useMyCourses} from "@/hooks/useMyCourses";
import {IconDatabase} from "@tabler/icons-react";

export function useSidebarData() {
  const {user} = useAuth();
  const{ data: courses, isLoading : coursesLoading, error, refetch} = useMyCourses(user?.id);

  const navWorkspaces = (courses || []).map(course => ({
    name: course.courseName,
    url: `/#/workspaces/${course.id}`,
    icon: IconDatabase,
  }));

  return{navWorkspaces, isLoading: coursesLoading};
}