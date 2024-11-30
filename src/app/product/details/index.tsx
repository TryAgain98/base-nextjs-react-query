"use client";
import { useExamplesQuery } from "@/hooks/react-query/useExampleQuery";

function Test() {
  const examplesQuery = useExamplesQuery();

  return (
    <div>
      123
      <div>
        {examplesQuery.data?.map((user) => (
          <p key={user.id}>{user.name}</p>
        ))}
      </div>
    </div>
  );
}

export default Test;
