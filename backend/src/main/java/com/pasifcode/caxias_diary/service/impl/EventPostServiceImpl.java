package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.application.exception.DuplicateTuplesException;
import com.pasifcode.caxias_diary.domain.dto.EventPostDto;
import com.pasifcode.caxias_diary.domain.entity.*;
import com.pasifcode.caxias_diary.domain.repository.*;
import com.pasifcode.caxias_diary.service.EventPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class EventPostServiceImpl implements EventPostService {

    @Autowired
    private EventPostRepository eventPostRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserRepository userRepository;


    @Override
    @Transactional(readOnly = true)
    public List<EventPostDto> search(Long eventId, Long projectId, Long postId) {
        Specification<EventPost> spec = Specification.where(null);

        if (eventId != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("event").get("id"), eventId));
        }

        if (projectId != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("event").get("project").get("id"), projectId));
        }

        if (postId != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("post").get("id"), postId));
        }

        return eventPostRepository.findAll(spec).stream().map(EventPostDto::new).toList();
    }

    @Override
    public void saveEventPost(EventPostDto dto) {
        Post post = postRepository.findById(dto.getPostId()).orElseThrow();
        Event event = eventRepository.findByTitle(dto.getEventTitle());
        User user = userRepository.findById(dto.getUserId()).orElseThrow();

        EventPost add = new EventPost();
        add.setPost(post);
        add.setEvent(event);
        add.setUser(user);
        for(EventPost e : eventPostRepository.findByEventAndPost(event, post)){
            if (Objects.equals(event.getId(), e.getEvent().getId()) &&
            Objects.equals(post.getId(), e.getPost().getId())){
                throw new DuplicateTuplesException("Este evento já está relacionado a esta postagem!");
            } else {
                new EventPostDto(eventPostRepository.saveAndFlush(add));
                return;
            }
        }
        new EventPostDto(add);
    }

    @Override
    public void deleteEventPost(Long id){
        this.eventPostRepository.deleteById(id);
    }
}
