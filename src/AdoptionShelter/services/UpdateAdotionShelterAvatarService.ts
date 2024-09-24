import path from "path";
import fs from "fs";
import uploadConfig from "../../config/upload";
import { AdoptionShelter } from "@prisma/client";
import prismaClient from "../../prisma/prisma";
import AppError from "../../shared/error/AppError";

interface IRequest {
  adoptionShelter_id: string;
  avatarFilename: string;
}

class UpdateAdoptionShelterAvatarService {
  public async execute({ avatarFilename, adoptionShelter_id }: IRequest): Promise<AdoptionShelter> {
    const adoptionShelter = await prismaClient.adoptionShelter.findUnique({
      where: { id: adoptionShelter_id },
    });

    if (!adoptionShelter) {
      throw new AppError("Adoption Shelter not found!", 404);
    }

    if (adoptionShelter.logo) { // Ajuste aqui para logo
      const adoptionShelterAvatarFilePath = path.join(uploadConfig.directory, adoptionShelter.logo);
      try {
        await fs.promises.stat(adoptionShelterAvatarFilePath);
        await fs.promises.unlink(adoptionShelterAvatarFilePath);
      } catch (error) {
        // O arquivo pode não existir; você pode ignorar o erro ou tratá-lo.
      }
    }

    adoptionShelter.logo = avatarFilename; // Ajuste para logo

    await prismaClient.adoptionShelter.update({
      where: { id: adoptionShelter_id },
      data: { logo: avatarFilename },
    });

    return adoptionShelter;
  }
}

export default UpdateAdoptionShelterAvatarService;
