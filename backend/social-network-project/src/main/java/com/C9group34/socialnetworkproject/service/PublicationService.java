package com.C9group34.socialnetworkproject.service;


import com.C9group34.socialnetworkproject.dto.PublicationDto;
import com.C9group34.socialnetworkproject.exceptions.ExistingResourceException;
import com.C9group34.socialnetworkproject.exceptions.ResourceNotFoundException;
import com.C9group34.socialnetworkproject.models.Publication;
import com.C9group34.socialnetworkproject.models.User;
import com.C9group34.socialnetworkproject.repository.PublicationRepository;
import com.C9group34.socialnetworkproject.repository.UserRepository;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PublicationService {

    private final PublicationRepository publicationRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public PublicationService(PublicationRepository publicationRepository, UserRepository userRepository, UserService userService) {
        this.publicationRepository = publicationRepository;
        this.userRepository = userRepository;
        this.userService = userService;
    }

    public void create(PublicationDto publicationDTO, Integer userId) {
        Optional<User> user = userRepository.findById(userId);

        Publication publication = mapToEntity(publicationDTO, user.get());
        publicationRepository.save(publication);

    }




    public List<PublicationDto> retrieveAll(Integer userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("El id del usuario que está ingresando no existe.");
        }
        List<Publication> publications = publicationRepository.findAll();
        return publications.stream()
                .map(publication -> mapToDTO(publication))
                .collect(Collectors.toList());
    }

    public PublicationDto retrieveById(Integer publicationId) {
        Optional<Publication> publication = publicationRepository.findById(publicationId);

        if (publication.isEmpty()) {
            throw new ResourceNotFoundException("El id de la publicacion que está buscando no existe.");
        }

        return mapToDTO(publication.get());
    }


    public void delete(Integer publicationId) {
        try {
            publicationRepository.deleteById(publicationId);
        } catch (EmptyResultDataAccessException e) {
            throw new ResourceNotFoundException();
        }
    }

    public void replace(Integer userId, PublicationDto publicationDto) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new ResourceNotFoundException("El id del usuario que está ingresando no existe.");
        }

        Optional<Publication> publication = publicationRepository.findById(userId);
        if (publication.isEmpty()) {
            throw new ResourceNotFoundException("El id de la publicacion que está ingresando no existe.");
        }

        Publication updatedPublication;
        Publication publicationToReplace = publication.get();
        updatedPublication = new Publication().builder().description(publicationToReplace.getDescription())
                .urlImg(publicationDto.getUrlImg())
                .rating(publicationDto.getRating())
                .status(publicationDto.getStatus()).build();

        publicationRepository.save(updatedPublication);

    }


    /*Publication updatedPublication;
        Publication publicationToReplace = publication.get();
        updatedPublication = new Publication().builder().description(publicationToReplace.getDescription())
                .urlImg(publicationDto.getUrlImg())
                .rating(publicationDto.getRating())
                .status(publicationDto.getStatus());

        publicationRepository.save(updatedPublication);

    }*/

   private Publication mapToEntity(PublicationDto publicationDto , User user) {
        Publication publication = new Publication().builder().description(publicationDto.getDescription())
                .urlImg(publicationDto.getUrlImg())
                .rating(publicationDto.getRating())
                .status(publicationDto.getStatus())
                .user(user).build();

        return publication;
    }


    private PublicationDto mapToDTO(Publication publication) {
        PublicationDto.PublicationDtoBuilder publicationDto = new PublicationDto().builder().description(publication.getDescription())
                .urlImg(publication.getUrlImg())
                .rating(publication.getRating())
                .status(publication.getStatus());

        return publicationDto.build();
    }
}
