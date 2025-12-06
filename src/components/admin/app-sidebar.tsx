import { Cat, MessageSquareText, UsersRound } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	useSidebar,
} from "../ui/sidebar";
import { AdminNavMain } from "./nav-main";
import { AdminNavUser } from "./nav-user";

const items = [
	{
		name: "Users",
		url: "/admin/users",
		icon: UsersRound,
	},
	{
		name: "Cat Requests",
		url: "/admin/cat-requests",
		icon: Cat,
	},
	{
		name: "Presumed Owners",
		url: "/admin/presumed-owners",
		icon: UsersRound,
	},
	{
		name: "Contact Us",
		url: "/admin/contact-us",
		icon: MessageSquareText,
	},
];

export const AdminAppSidebar = ({
	user,
}: React.ComponentProps<typeof Sidebar> & {
	user: { firstName: string; lastName: string; email: string };
}) => {
	const { state } = useSidebar();

	return (
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader>
				<p className="tracking-widest font-extrabold text-3xl w-full">
					{state === "collapsed" ? "Mixi" : "Find My Mixi"}
				</p>
			</SidebarHeader>
			<SidebarContent className="group-data-[collapsible=icon]:overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
				<AdminNavMain items={items} />
			</SidebarContent>
			<SidebarFooter>
				<AdminNavUser
					user={{
						name: `${user.firstName} ${user.lastName}`,
						email: user.email,
					}}
				/>
			</SidebarFooter>
		</Sidebar>
	);
};
