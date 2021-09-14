import { gql } from "@apollo/client";

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

  const GET_ALL_GUIDESCHEDULE_BYGUIDE = gql`
    query GET_ALLGUIDESCHEDULE_BYGUIDE(
      $getAllGuidescheduleByGuideGuideId: ID!
    ) {
      getAllGuidescheduleByGuide(GuideId: $getAllGuidescheduleByGuideGuideId) {
        _id
        ScheduleDate
        Available
        Period
        WorkOnAppointment {
          _id
          AppointTime
          Customer {
            FirstName
            LastName
            Email
            Gmail
            Avatar {
              _id
              filename
              mimetype
              data
            }
            CongenitalDisorders
            PhoneNumber
            Gender
            DOB
            EmergencyTel
          }
          Department {
            Name
          }
          Hospital {
            Name
          }
          Note
          Status {
            Tag
            Details
          }
          CreatedAt
          UpdatedAt
        }
        Status {
          Tag
          Details
        }
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const GET_SINGLE_GUIDESCHEDULE = gql`
    query GET_SINGLE_GUIDESCHEDULE($getGuidescheduleId: ID!) {
      getGuideschedule(_id: $getGuidescheduleId) {
        _id
        ScheduleDate
        Available
        Period
        WorkOnAppointment {
          _id
          AppointTime
          Customer {
            FirstName
            LastName
            Email
            Gmail
            Avatar {
              _id
              filename
              mimetype
              data
            }
            CongenitalDisorders
            PhoneNumber
            Gender
            DOB
            EmergencyTel
          }
          Department {
            Name
          }
          Hospital {
            Name
          }
          Note
          Status {
            Tag
            Details
          }
          CreatedAt
          UpdatedAt
        }
        Status {
          Tag
          Details
        }
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const GET_EXTENDTION_DATA = gql`
    query GET_EXTENDTION_DATA {
      getAppointmentStatus
      getPeriod
    }
  `;

  const UPDATE_APPOINTMENT_BEGINTIME = gql`
    mutation UPDATE_APPOINTMENT_BEGINTIME(
      $updateAppointmentBeginTimeId: ID!
      $updateAppointmentBeginTimeBeginTime: String!
    ) {
      updateAppointmentBeginTime(
        _id: $updateAppointmentBeginTimeId
        BeginTime: $updateAppointmentBeginTimeBeginTime
      ) {
        _id
        BeginTime
        EndTime
      }
    }
  `;

  const UPDATE_APPOINTMENT_ENDTIME = gql`
    mutation UpdateAppointmentRequestGuideMutation(
      $updateAppointmentEndTimeId: ID!
      $updateAppointmentEndTimeEndTime: String!
    ) {
      updateAppointmentEndTime(
        _id: $updateAppointmentEndTimeId
        EndTime: $updateAppointmentEndTimeEndTime
      ) {
        _id
        BeginTime
        EndTime
      }
    }
  `;

  const UPDATE_APPOINTMENT_RECORD = gql`
    mutation UPDATE_APPOINTMENT_RECORD(
      $updateAppointmentRecordId: ID!
      $updateAppointmentRecordRecordinput: RecordInput
    ) {
      updateAppointmentRecord(
        _id: $updateAppointmentRecordId
        recordinput: $updateAppointmentRecordRecordinput
      ) {
        _id
        Record {
          At
          Title
          Description
        }
      }
    }
  `;

  const CREATE_GUIDESCHEDULE = gql`
    mutation CREATE_GUIDESCHEDULE(
      $createGuideScheduleInput: GuideScheduleInput
    ) {
      createGuideSchedule(input: $createGuideScheduleInput) {
        _id
        ScheduleDate
        Available
        Period
        WorkOnAppointment {
          _id
        }
        Status {
          Tag
          Details
        }
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const UPDATE_GUIDESCHEDULE = gql`
    mutation UPDATE_GUIDESCHEDULE(
      $updateGuideScheduleId: ID!
      $updateGuideScheduleScheduleDate: String!
      $updateGuideSchedulePeriod: String!
    ) {
      updateGuideSchedule(
        _id: $updateGuideScheduleId
        ScheduleDate: $updateGuideScheduleScheduleDate
        Period: $updateGuideSchedulePeriod
      ) {
        _id
        ScheduleDate
        Available
        Period
        WorkOnAppointment {
          _id
        }
        Status {
          Tag
          Details
        }
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const UPDATE_GUIDESCHEDULE_RESPONSE = gql`
    mutation UPDATE_GUIDESCHEDULE_RESPONSE(
      $updateGuideScheduleResponseAppointmentId: ID!
      $updateGuideScheduleResponseAppointmentResponse: Boolean!
      $updateGuideScheduleResponseAppointmentWorkOnAppointmentId: ID!
    ) {
      updateGuideScheduleResponseAppointment(
        _id: $updateGuideScheduleResponseAppointmentId
        response: $updateGuideScheduleResponseAppointmentResponse
        WorkOnAppointmentId: $updateGuideScheduleResponseAppointmentWorkOnAppointmentId
      ) {
        _id
        ScheduleDate
        Available
        Period
        WorkOnAppointment {
          _id
        }
        Status {
          Tag
          Details
        }
        CreatedAt
        UpdatedAt
      }
    }
  `;

  const DELETE_GUIDESCHEDULE = gql`
    mutation DELETE_GUIDESCHEDULE($deleteGuideScheduleId: ID!) {
      deleteGuideSchedule(_id: $deleteGuideScheduleId) {
        _id
      }
    }
  `;

  const CREATE_REPORT = gql`
    mutation CREATE_REPORT($createReportInput: ReportInput!) {
      createReport(input: $createReportInput) {
        _id
        Title
        Description
        ByGuide {
          _id
        }
        ResponseText
        CreatedAt
        UpdatedAt
      }
    }
  `;

  return {
    GET_SINGLE_GUIDE,
    SIGNUP_GUIDE,
    UPDATE_GUIDE,
    DELETE_GUIDE,
    LOGIN_GUIDE,
    GET_ALL_GUIDESCHEDULE_BYGUIDE,
    GET_SINGLE_GUIDESCHEDULE,
    GET_EXTENDTION_DATA,
    UPDATE_APPOINTMENT_BEGINTIME,
    UPDATE_APPOINTMENT_ENDTIME,
    UPDATE_APPOINTMENT_RECORD,
    CREATE_GUIDESCHEDULE,
    UPDATE_GUIDESCHEDULE,
    UPDATE_GUIDESCHEDULE_RESPONSE,
    DELETE_GUIDESCHEDULE,
    CREATE_REPORT,
  };
};

export default useGuideApi;
