import { gql, useQuery, useMutation } from "@apollo/client";

const useGuideApi = () => {

  const getSingleGuide = gql`
    query Query($getGuideId: ID!) {
      getGuide(_id: $getGuideId) {
        _id
        FirstName
        LastName
        Gender
        DOB
        Address
        ContactAddress
        PhoneNumber
        Email
        IsValidated
        Education {
          Degree
          Acadamy
          Certificate
        }
        WorkExp {
          JobTitle
          WorkPlace
          JobPosition
        }
        LangSkill {
          Languages
          Level
        }
        IdCard
        FaceWithIdCard
        ValidatedDate
        GoogleId
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const createGuide = gql`
    mutation CreatedGuideMutation($createdGuideInput: GuideSigninInput!) {
      createdGuide(input: $createdGuideInput) {
        _id
        FirstName
        LastName
        Gender
        DOB
        Address
        ContactAddress
        PhoneNumber
        Email
        IsValidated
        Education {
          Degree
          Acadamy
          Certificate
        }
        WorkExp {
          JobTitle
          WorkPlace
          JobPosition
        }
        LangSkill {
          Languages
          Level
        }
        IdCard
        FaceWithIdCard
        ValidatedDate
        GoogleId
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const updateGuide = gql`
    mutation UpdateGuideMutation(
      $updateGuideId: ID!
      $updateGuideInput: GuideUpdateInput!
    ) {
      updateGuide(_id: $updateGuideId, input: $updateGuideInput) {
        _id
        FirstName
        LastName
        Gender
        DOB
        Address
        ContactAddress
        PhoneNumber
        Email
        IsValidated
        Education {
          Degree
          Acadamy
          Certificate
        }
        WorkExp {
          JobTitle
          WorkPlace
          JobPosition
        }
        LangSkill {
          Languages
          Level
        }
        IdCard
        FaceWithIdCard
        ValidatedDate
        GoogleId
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const deleteGuide = gql`
    mutation DeleteGuideMutation($deleteGuideId: ID!) {
      deleteGuide(_id: $deleteGuideId) {
        _id
        FirstName
        LastName
        Gender
        DOB
        Address
        ContactAddress
        PhoneNumber
        Email
        IsValidated
        Education {
          Degree
          Acadamy
          Certificate
        }
        WorkExp {
          JobTitle
          WorkPlace
          JobPosition
        }
        LangSkill {
          Languages
          Level
        }
        IdCard
        FaceWithIdCard
        ValidatedDate
        GoogleId
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const loginGuide = gql`
    query Login($loginGuideToken: String!) {
      loginGuide(Token: $loginGuideToken) {
        _id
        FirstName
        LastName
        Gender
        DOB
        Address
        ContactAddress
        PhoneNumber
        Email
        IsValidated
        Education {
          Degree
          Acadamy
          Certificate
        }
        WorkExp {
          JobTitle
          WorkPlace
          JobPosition
        }
        LangSkill {
          Languages
          Level
        }
        IdCard
        FaceWithIdCard
        ValidatedDate
        GoogleId
        Avatar
        CongenitalDisorders
        Role
        CreatedAt
        UpdatedAt
      }
    }
  `;

  return {
    getSingleGuide,
    createGuide,
    updateGuide,
    deleteGuide,
    loginGuide,
  };
};

export default useGuideApi;