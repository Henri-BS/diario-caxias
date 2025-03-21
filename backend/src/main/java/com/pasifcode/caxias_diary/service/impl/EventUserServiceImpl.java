package com.pasifcode.caxias_diary.service.impl;

import com.pasifcode.caxias_diary.domain.dto.EventUserDto;
import com.pasifcode.caxias_diary.domain.entity.*;
import com.pasifcode.caxias_diary.domain.repository.EventRepository;
import com.pasifcode.caxias_diary.domain.repository.EventUserRepository;
import com.pasifcode.caxias_diary.domain.repository.UserRepository;
import com.pasifcode.caxias_diary.service.EventUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EventUserServiceImpl implements EventUserService {

    @Autowired
    private EventUserRepository eventUserRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Override
    public Page<EventUserDto> search(Long userId, Long eventId, Pageable pageable) {
        Specification<EventUser> spec = Specification.where(null);

        if (userId != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("user").get("id"), userId));
        }

        if (eventId != null) {
            spec = spec.and((root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("event").get("id"), eventId));
        }

        return eventUserRepository.findAll(spec, pageable).map(EventUserDto::new);
    }


    @Override
    @Transactional(readOnly = true)
    public EventUserDto findById(Long id) {
        EventUser find = eventUserRepository.findById(id).orElseThrow();
        return new EventUserDto(find);
    }

    @Override
    public EventUserDto saveEventUser(EventUserDto dto) {
        User user = userRepository.findById(dto.getUserId()).orElseThrow();
        Event event = eventRepository.findById(dto.getEventId()).orElseThrow();

        EventUser add = new EventUser();
                add.setUser(user);
                add.setEvent(event);
        return new EventUserDto(eventUserRepository.saveAndFlush(add));
    }

    @Override
    public void deleteEventUser(Long id) {
        this.eventUserRepository.deleteById(id);
    }
}
