'use client';

import Image from 'next/image';
import { useState } from 'react';
import { updateUserData, uploadImage } from '@/lib/userController';
import { SlPencil } from 'react-icons/sl';
import { useRouter } from 'next/navigation';
import { UserData } from '@/models/UserData';

const Profile = ({ data }: { data: UserData }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<UserData>(data);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [changeData, setChangeData] = useState({
    name: true,
    email: true,
    address: true,
    phone: true,
    sim: true,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, profilePhotoUrl: imageUrl });
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      let profilePhotoUrl = formData.profilePhotoUrl;

      if (selectedFile) {
        profilePhotoUrl = await uploadImage(selectedFile, data.id);
      }

      await updateUserData(data.id, { ...formData, profilePhotoUrl });
      alert('Update successful');
      setChangeData({
        name: true,
        email: true,
        address: true,
        phone: true,
        sim: true,
      });

      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex lg:flex-row flex-col gap-10">
      <div className="flex flex-col w-full max-w-64 lg:mx-0 mx-auto">
        <div className="w-full h-full">
          <Image
            src={`${formData.profilePhotoUrl ? formData.profilePhotoUrl : '/user.png'}`}
            alt="Profile"
            width={200}
            height={200}
            priority
            className="object-cover w-full bg-transparent"
          />
        </div>
        <input
          type="file"
          id="profile"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label
          htmlFor="profile"
          className="cursor-pointer border border-custom-medium px-4 py-2 rounded-lg text-center text-sm active:scale-[99%] transition-all duration-300"
        >
          {formData.profilePhotoUrl ? 'Ganti Foto Profil' : 'Pilih Foto Profil'}
        </label>
      </div>
      <div className="w-full flex flex-grow flex-col gap-3">
        <div className="flex flex-col w-full ">
          <label htmlFor="name" className="font-semibold text-sm">
            Name
          </label>
          <div className="relative">
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              disabled={changeData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={`w-full text-sm p-1.5 rounded-md bg-transparent border ${changeData.name ? 'border-custom-semiThin text-custom-semiThin' : 'border-custom-medium text-custom-medium'}`}
            />
            <span
              onClick={() => setChangeData({ ...changeData, name: !changeData.name })}
              className="absolute flex items-center gap-1 right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
            >
              <SlPencil size={12} />
              Ubah
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="email" className="font-semibold text-sm">
            Email
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              disabled={changeData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className={`w-full text-sm p-1.5 rounded-md bg-transparent border ${changeData.email ? 'border-custom-semiThin text-custom-semiThin' : 'border-custom-medium text-custom-medium'}`}
            />
            <span
              onClick={() => setChangeData({ ...changeData, email: !changeData.email })}
              className="absolute flex items-center gap-1 right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
            >
              <SlPencil size={12} />
              Ubah
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="address" className="font-semibold text-sm">
            Address
          </label>
          <div className="relative">
            <input
              id="address"
              type="text"
              placeholder="Enter your address"
              value={formData.address}
              disabled={changeData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className={`w-full text-sm p-1.5 rounded-md bg-transparent border ${changeData.address ? 'border-custom-semiThin text-custom-semiThin' : 'border-custom-medium text-custom-medium'}`}
            />
            <span
              onClick={() => setChangeData({ ...changeData, address: !changeData.address })}
              className="absolute flex items-center gap-1 right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
            >
              <SlPencil size={12} />
              Ubah
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="phone" className="font-semibold text-sm">
            Number Phone
          </label>
          <div className="relative">
            <input
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={formData.phone}
              disabled={changeData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className={`w-full text-sm p-1.5 rounded-md bg-transparent border ${changeData.phone ? 'border-custom-semiThin text-custom-semiThin' : 'border-custom-medium text-custom-medium'}`}
            />
            <span
              onClick={() => setChangeData({ ...changeData, phone: !changeData.phone })}
              className="absolute flex items-center gap-1 right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
            >
              <SlPencil size={12} />
              Ubah
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full ">
          <label htmlFor="noSIM" className="font-semibold text-sm">
            Number SIM
          </label>
          <div className="relative">
            <input
              id=" noSIM"
              type="text"
              placeholder="Enter your SIM number"
              value={formData.noSIM}
              disabled={changeData.sim}
              onChange={(e) =>
                setFormData({ ...formData, noSIM: e.target.value })
              }
              className={`w-full text-sm p-1.5 rounded-md bg-transparent border ${changeData.sim ? 'border-custom-semiThin text-custom-semiThin' : 'border-custom-medium text-custom-medium'}`}
            />
            <span
              onClick={() => setChangeData({ ...changeData, sim: !changeData.sim })}
              className="absolute flex items-center gap-1 right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer"
            >
              <SlPencil size={12} />
              Ubah
            </span>
          </div>
        </div>
        <button
          onClick={handleUpdateProfile}
          className="w-fit bg-custom-medium hover:bg-custom-medium/70 text-custom-light py-2 px-4 rounded-lg active:scale-[99%] transition duration-300"
        >
          {loading ? 'Loading...' : 'Update Profile'}
        </button>
      </div>
    </div>
  );
};

export default Profile;

