const ProfileCard = () => {
    return (
      <div className="w-96 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Imagen de perfil */}
        <div className="h-80 w-full">
          <img
            src="https://docs.material-tailwind.com/img/team-3.jpg"
            alt="profile-picture"
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* Información */}
        <div className="text-center p-6">
          <h4 className="text-2xl font-semibold text-gray-800">Natalie Paisley</h4>
          <p className="text-gray-600 font-medium">CEO / Co-Founder</p>
        </div>
  
        {/* Íconos sociales */}
        <div className="flex justify-center gap-6 pb-6">
          <a
            href="#facebook"
            className="text-blue-600 hover:text-blue-800 transition duration-300 text-xl"
            title="Like"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a
            href="#twitter"
            className="text-sky-500 hover:text-sky-700 transition duration-300 text-xl"
            title="Follow"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="#instagram"
            className="text-purple-600 hover:text-purple-800 transition duration-300 text-xl"
            title="Follow"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    );
  };
  
  export default ProfileCard;
  