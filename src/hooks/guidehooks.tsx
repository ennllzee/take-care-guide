import { gql, useQuery, useMutation } from "@apollo/client";

const useGuideApi = () => {
  const GET_SINGLE_GUIDE = gql`
    query GET_SINGLE_GUIDE($getGuideId: ID!) {
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
        Education {
          Degree
          Acadamy
          Certificate
        }
        WorkExp {
          JobTitle
          WorkPlace
        }
        LangSkill {
          Level
          Language
        }
        IdCard
        FaceWithIdCard
        GoogleId
        Avatar
        Role
        CreatedAt
        UpdatedAt
        Gmail
        IsVerified
        VerifyDate
        Status {
          Tag
          Details
        }
      }
    }
  `;

  const SIGNUP_GUIDE = gql`
    mutation SIGNUP_GUIDE($createdGuideInput: GuideSigninInput!) {
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
        Education {
          Degree
          Acadamy
          Certificate
        }
        WorkExp {
          JobTitle
          WorkPlace
        }
        LangSkill {
          Languages
          Level
        }
        IdCard
        FaceWithIdCard
        GoogleId
        Avatar
        Role
        CreatedAt
        UpdatedAt
        IsVerified
        VerifyDate
        Status {
          Tag
          Details
        }
      }
    }
  `;

  const UPDATE_GUIDE = gql`
    mutation UPDATE_GUIDE(
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

  const DELETE_GUIDE = gql`
    mutation DELETE_GUIDE($deleteGuideId: ID!) {
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

  const LOGIN_GUIDE = gql`
    query LOGIN_GUIDE($loginGuideToken: String!) {
      loginGuide(Token: $loginGuideToken) {
        _id
      }
    }
  `;

  return {
    GET_SINGLE_GUIDE,
    SIGNUP_GUIDE,
    UPDATE_GUIDE,
    DELETE_GUIDE,
    LOGIN_GUIDE,
  };
};

export default useGuideApi;
