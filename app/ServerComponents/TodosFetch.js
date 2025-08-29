import CustomContainer from "../components/CustomContainer";
import TodoPage from "../todoPage/page"
export default async function TodosFetch(){
    try {
    const res = await fetch("/api/todos", {
      cache: "no-store",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return (
        <>
          <CustomContainer className="flex flex-col md:w-[60%] mx-auto h-auto p-5">
            <div>Error: {errorData.error || "Failed to fetch todos"}</div>;
          </CustomContainer>
          
        </>
      )
    }

    const todos = await res.json();

    return <TodoPage initialVal={todos} />;
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    return <div>Error loading todos: {error.message}</div>;
  }
}

