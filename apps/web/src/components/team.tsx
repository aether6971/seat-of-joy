import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { team } from "../lib/teamData";
import Link from "next/link";

export const TeamComponent = () => {
  return (
    <section className="bg-white">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
            meet our team
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 ">
          {team.map((member, key) => (
            <div key={key} className="flex flex-col items-center space-y-3 border-dark border-opacity-50 border p-4 rounded-[10px]">
              <Avatar className="bg-white text-dark h-30 w-30 rounded-full object-cover">
                <AvatarImage height={120} width={120} src={member.image} />
                <AvatarFallback>
                  {member.name
                    .match(/(\b\S)?/g)
                    ?.join("")
                    .match(/(^\S|\S$)?/g)
                    ?.join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <Link href={member.website}>
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {member.role}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {member.about}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
