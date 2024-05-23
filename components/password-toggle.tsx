import { useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { FaRegEyeSlash } from 'react-icons/fa';

const PasswordToggle = () => {
  const [password, setPassword] = useState(true);
  const handleClick = () => {
    setPassword(!password);
  };
  return (
    <>
      <div className="flex items-center ">
        <input
          type={password ? 'password' : 'text'}
          className="border rounded-md p-3 w-full outline-none bg-zinc-200"
          placeholder="Enter your password"
        />
        <div className="-ml-10">
          {password ? (
            <BsEye onClick={handleClick} />
          ) : (
            <FaRegEyeSlash onClick={handleClick} />
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordToggle;
