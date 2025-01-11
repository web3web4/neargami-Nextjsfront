import { Fragment } from "react";
import Header from "@/section/Header/v2/Header";
import PageHeader from "@/components/pageHeader/PageHeader";
import EditProfileDetails from "@/section/Profile/EditProfile/EditProfileDetails";

export default function EditProfilePage() {
  return (
    <Fragment>
      <Header />
      <PageHeader currentPage="Profile" pageTitle="Profile Details"/>
        <EditProfileDetails />
    </Fragment>
  );
}